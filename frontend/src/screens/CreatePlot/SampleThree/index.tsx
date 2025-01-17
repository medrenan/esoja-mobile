import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepEight from '../../../assets/plot-steps-images/StepSample.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { SampleTwoScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepEightHelperImage
} from './styles';

const sampleThree = yup.object().shape({
  grainsPlant1: yup
    .number()
    .required(translate('SampleThree.required'))
    .min(1, translate('SampleThree.required')),
  grainsPlant2: yup
    .number()
    .required(translate('SampleThree.required'))
    .min(1, translate('SampleThree.required'))
});

//Passo 9 ou 7B
export const SampleThree: React.FC<
  SampleTwoScreenRouteProps
> = ({ navigation }) => {
  const { saveStep, getPersistedData,getPersistedGrains } = useSample();
  const { createSample } = useSample();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(sampleThree)
  });

  const handleCallAi = async ()=>{
    const grains = await getPersistedGrains();
    setValue('grainsPlant1', grains?.pods.toString());
    setValue('grainsPlant2', grains?.pods.toString());
  }

  useEffect(() => {
    getPersistedData().then(data => {
      if (data?.plantC) {
        setValue('grainsPlant1', data?.plantC?.grainsPlant1?.toString() || '');
        setValue('grainsPlant2', data?.plantC?.grainsPlant2?.toString() || '');
        setValue('description', data?.plantC?.description || '');
      }else{
        handleCallAi();
      }
    });
  }, [getPersistedData, setValue]);

  const handleSampleThree = async (data: FieldValues) => {
    const sample: any = {
      plantC: {
        grainsPlant1: data.grainsPlant1,
        grainsPlant2: data.grainsPlant2
      }
    };
    if (data?.description) {
      sample.plantC.description = data.description;
    }

    saveStep(sample);
    await createSample();
    navigation.navigate('Plots');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('SampleThree.title')}
          subtitle={translate('SampleThree.subtitle')}
        />
        <StepIndicator step={2} indicator={6} />
        <FormContainer>
          <TextInput
            label="SampleThree.sampleA"
            placeholder={translate('SampleThree.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant1"
            control={control}
            errorMessage={errors?.grainsPlant1?.message}
          />
          <TextInput
            label="SampleThree.sampleB"
            placeholder={translate('SampleThree.samplePlaceholder')}
            icon="check-square"
            name="grainsPlant2"
            control={control}
            errorMessage={errors?.grainsPlant2?.message}
          />
          <TextInput
            label="SampleThree.sampleDescription"
            placeholder={translate(
              'SampleThree.sampleDescriptionPlaceholder'
            )}
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSampleThree)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
