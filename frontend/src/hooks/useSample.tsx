import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { FieldValues } from 'react-hook-form';
import { api, api2 } from '../data/services/api';
import { useUpload } from './useUpload';

interface Sample {
  metersBetweenPlants?: string;
  plantsPerMeter?: string;
  plantA?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  plantB?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  plantC?: {
    grainsPlant1?: number;
    grainsPlant2?: number;
    description?: string;
  };
  photo?: string;
  cultiveId?: string;
}

interface SampleContextData {
  saveStep: (data: FieldValues) => Promise<void>;
  getPersistedData: () => Promise<Sample | null>;
  createSample: () => Promise<any>;
  getGrainsEstimation:()=>Promise<any>;
  saveImage:(photoUri:string) => Promise<void>;
  deleteSample:(id:string) => Promise<void>;
}

type SampleContextProps = {
  children: ReactNode;
};

const SampleContext = createContext({} as SampleContextData);

const SampleProvider: React.FC<SampleContextProps> = ({ children }) => {
  const [sample, setSample] = useState<Sample | null>(null);
  const { pictureUpload } = useUpload();

  const persistData = async (data: Sample) => {
    await AsyncStorage.setItem('@esoja:sample', JSON.stringify(data));
  };

  const removeData = async () => {
    await AsyncStorage.removeItem('@esoja:sample');
  };

  const getPersistedData = useCallback(async () => {
    if (sample) {
      return sample;
    }
    const data = await AsyncStorage.getItem('@esoja:sample');
    if (data) {
      setSample(JSON.parse(data));
      return JSON.parse(data);
    }
    return null;
  }, [sample]);

  const saveStep = useCallback(
    async (data: FieldValues) => {
      setSample(prev => ({ ...prev, ...data }));
      await persistData({ ...sample, ...data });
    },
    [sample]
  );

    const saveImage = useCallback(
    async (photoUri: string) => {
      const sample2= {...sample,photo:photoUri}
      setSample(prev => ({ ...prev, ...sample2 }));
      await persistData({ ...sample, ...sample2 });
    },
    [sample]
  );

  const createSample = useCallback(
    async () => {
      
        const fullData: Sample = await getPersistedData();
        //arrumar
        let photo = "https://imgs.search.brave.com/8ZTBfvXb71OwITJ6U3PIWblIynONHr6ddNwpNjZmS9Y/rs:fit:256:256:1/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJ5/NW91aC9zdHlsZXMv/Y29tbXVuaXR5SWNv/bl93eXdyb3k4bGp6/ZTUxLnBuZz93aWR0/aD0yNTYmcz04YzZk/YWM3MDEwYjc5NDhm/OGE2NzRkZWFmMmZj/NWU5MmY3ZTQ0ZTBm"
        try {          
          photo = await pictureUpload(fullData.photo+"", 'sample')+"";
        } catch (error) {
          console.log(error.message);
        }

        const updatePlot = {
          plantsPerMeter: fullData?.plantsPerMeter,
          metersBetweenPlants: (Number(fullData?.metersBetweenPlants) || 0) / 100,
          photo: photo
        };
        try {
  
          await api.put(
          `/cultive/sample-information/${fullData?.cultiveId}`,
          updatePlot
          );
        } catch (error) {
        }

        const newSample = {
          cultiveId: fullData?.cultiveId,
          samples: [
            { ...fullData?.plantA, name: 'Amostra 1' },
            { ...fullData?.plantB, name: 'Amostra 2' },
            { ...fullData?.plantC, name: 'Amostra 3' }
          ]
        };
        
        try {
          await api.post('/sample', newSample);
          removeData();
        } catch (error) {
          
        }
    },
    [getPersistedData, pictureUpload]
  );

  const deleteSample = async (id:string)=>{
      const res = await api.delete('/sample/'+id);
      return res;
  }

  const getGrainsEstimation = useCallback(
    async ()=>{
        const fullData: Sample = await getPersistedData();
        const grains = await api2.get(`/getGrains/${fullData?.cultiveId}`)
        return grains.data;
    },[]
  )

  const providerValue = useMemo(
    () => ({
      saveStep,
      getPersistedData,
      createSample,
      getGrainsEstimation,
      saveImage,
      deleteSample
    }),
    [saveStep, getPersistedData, createSample,getGrainsEstimation,saveImage,deleteSample]
  );
  return (
    <SampleContext.Provider value={providerValue}>
      {children}
    </SampleContext.Provider>
  );
};

const useSample = () => {
  const context = useContext(SampleContext);

  if (!context) {
    throw new Error('useSample must be used within an SampleProvider');
  }

  return context;
};

export { useSample, SampleProvider };
