import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import * as yup from 'yup';
import { Button } from '../../../components/Button';
import { DateInput } from '../../../components/DateInput';
import { Select } from '../../../components/Select';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import { TextInputMask } from '../../../components/TextInputMask';
import Title from '../../../components/Title';
import { translate } from '../../../data/I18n';
import { SelectOptions } from '../../../data/Model/SelectOptions';
import { PlotIdentificationScreenRouteProps } from '../../../data/routes/app';
import { useAuth } from '../../../hooks/useAuth';
import { usePlot } from '../../../hooks/usePlot';
import { useProperty } from '../../../hooks/useProperty';
import { Container, FormContainer, NextStepButton } from './styles';

const plotIdentification = yup.object().shape({
  description: yup.string().required(translate('PlotIdentification.nameRequired')),
  plantingDate: yup.date().required(translate('PlotIdentification.date')),
  cropYear: yup
    .string()
    .required(translate('PlotIdentification.date'))
    .min(9, translate('PlotIdentification.format'))
});

//Passo 2
export const PlotIdentification: React.FC<PlotIdentificationScreenRouteProps> = ({
  navigation
}) => {
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [propertyId, setPropertyId] = useState('default');
  const [error, setError] = useState('');
  const { createPlot } = usePlot();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(plotIdentification)
  });

  const { authUser } = useAuth();
  const { getProperties } = useProperty();

  const handlePlotIdentification = async (data: FieldValues) => {
    if (propertyId === 'default') {
      return setError(translate('PlotIdentification.property'));
    }
    data.plantingDate = format(new Date(data.plantingDate), 'yyyy-MM-dd');
    try {
      await createPlot({ ...data, propertyId });
      return navigation.navigate('Plots');
    } catch (err) {
      return Alert.alert(translate('PlotIdentification.createPlot'));
    }
  };

  useEffect(() => {
    const getSelectData = async (): Promise<void> => {
      const query: Query = {
        select: 'name',
        filter: [{ path: 'userId', operator: 'equals', value: authUser.id }]
      };
      const properties = await getProperties(query);
      if (properties) {
        setOptions(
          properties.map(property => ({
            value: `${property.id}`,
            label: `${property.name}`
          }))
        );
      }
    };
    getSelectData();
  }, [authUser.id, getProperties]);

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('PlotIdentification.title')}
          subtitle={translate('PlotIdentification.subtitle')}
        />
        <StepIndicator step={1} stepNumber={2} />
        <FormContainer>
          {!!options.length && (
            <Select
              placeholder={translate(
                'PlotIdentification.fieldPropertyPlaceholder'
              )}
              selectedValue={propertyId}
              onValueChange={value =>
                value !== 'default' && setPropertyId(`${value}`)
              }
              icon="file-text"
              itens={options}
              label="PlotIdentification.fieldPropertyLabel"
              error={error}
            />
          )}

          <TextInput
            label="PlotIdentification.fieldName"
            placeholder={translate('PlotIdentification.fieldNamePlaceholder')}
            icon="check-square"
            name="description"
            control={control}
            errorMessage={errors?.description?.message}
          />
          <TextInput name="plantingDate"
            icon="calendar"
            label="PlotIdentification.fieldDate"
            errorMessage={errors?.plantingDate?.message}
            placeholder={translate('PlotIdentification.fieldDatePlaceholder')}
            control={control}  />
          <TextInputMask
            mask="9999-9999"
            label="PlotIdentification.fieldCropYear"
            placeholder={translate(
              'PlotIdentification.fieldCropYearPlaceholder'
            )}
            icon="check-square"
            name="cropYear"
            control={control}
            errorMessage={errors?.cropYear?.message}
          />
          <NextStepButton>
            <Button
              title={translate('PlotIdentifcation.finishButton')}
              onPress={handleSubmit(handlePlotIdentification)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
