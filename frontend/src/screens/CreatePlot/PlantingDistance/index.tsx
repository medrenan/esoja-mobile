import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import StepThree from '../../../assets/plot-steps-images/StepThree.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import Title from '../../../components/Title';
import { PlantingDistanceScreenRouteProps } from '../../../data/routes/app';
import { useSample } from '../../../hooks/useSample';
import { translate } from '../../../data/I18n';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepThreeHelperImage
} from './styles';

const plantingDistance = yup.object().shape({
  metersBetweenPlants: yup
    .number()
    .required('PlantingDistance.required')
    .min(1, 'PlantingDistance.min')
});

//Passo 3 ou 1 B
export const PlantingDistance: React.FC<
  PlantingDistanceScreenRouteProps
> = ({ navigation, route }) => {
  const { cultiveId } = route.params;
  const { saveStep, getPersistedData } = useSample();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(plantingDistance)
  });

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue(
          'metersBetweenPlants',
          data?.metersBetweenPlants?.toString() || ''
        );
      }
    });
  }, [getPersistedData, setValue]);
  const handlePlantingDistance = (data: FieldValues) => {
    data.cultiveId = cultiveId;
    saveStep(data);
    navigation.navigate('NumberPlants');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('PlantingDistance.title')}
          subtitle={translate('PlantingDistance.subtitle')}
        />
        <StepIndicator step={0} indicator={1} />
        <FormContainer>
          <HelperImageContainer>
            <StepThreeHelperImage source={StepThree} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="PlantingDistance.distanceBetweenLines"
            placeholder={translate(
              'PlantingDistance.distanceBetweenLinesPlaceholder'
            )}
            icon="check-square"
            keyboardType="numeric"
            name="metersBetweenPlants"
            control={control}
            errorMessage={errors?.metersBetweenPlants?.message}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handlePlantingDistance)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
