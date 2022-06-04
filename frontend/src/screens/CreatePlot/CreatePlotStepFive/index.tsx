import React from 'react';
import { ScrollView } from 'react-native';
import StepFive from '../../../assets/plot-steps-images/StepFive.png';
import { Button } from '../../../components/Button';
import { StepIndicator } from '../../../components/StepIndicator';
import Title from '../../../components/Title';
import { CreatePlotStepFiveScreenRouteProps } from '../../../data/routes/app';
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepFiveHelperImage
} from './styles';

export const CreatePlotStepFive: React.FC<
  CreatePlotStepFiveScreenRouteProps
> = ({ navigation }) => {
  const handleSubmitStepFive = () => {
    navigation.navigate('CreatePlotStepSix');
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title="Extração das amostras"
          subtitle="Nos proximos passos, vamos precisar de amostras do plantio, continue quando estiver proximo do talhão, os passos feitos ate aqui ja foram salvos e não serão perdidos"
        />
        <StepIndicator step={1} indicator={3} />
        <FormContainer>
          <HelperImageContainer>
            <StepFiveHelperImage source={StepFive} resizeMode="contain" />
          </HelperImageContainer>
          <NextStepButton>
            <Button title="Continuar" onPress={handleSubmitStepFive} />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
