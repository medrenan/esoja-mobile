import React from 'react';
import { View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { translate } from '../../data/I18n';
import { Plot } from '../../data/Model/Plot';
import { AddButton } from '../../screens/Plots/styles';
import { defaultImage } from '../../utils/default';

import {
  InformationContainer,
  PlotArea,
  PlotCropYear,
  PlotInformationContainer,
  PlotName,
  PlotProduction,
  Icon,
  ViewInformation
} from './styles';

interface PlotCardProps {
  plot: Plot;
  onPress: (plotId: string) => void;
}

export const PlotCard: React.FC<PlotCardProps> = ({ plot, onPress }) => {
  return (
    <PlotInformationContainer>
    
        <Avatar.Image source={{ uri: plot?.photo || defaultImage }} />
        <InformationContainer>
          <ViewInformation onPress={() => onPress(plot.id)}>
              <PlotName>{plot?.description}</PlotName>
              <PlotCropYear>
                {translate('plots.PlotCardCropYear')}: {plot?.cropYear}
              </PlotCropYear>
              <PlotArea>Area: {plot?.areaTotal} hectares</PlotArea>
              {plot?.expectedProduction && (
                <PlotProduction>
                  {translate('plots.PlotCardProdExpectation')}:{' '}
                  {plot.expectedProduction.toFixed(2)} ton/ha
                  
                </PlotProduction>
                )}
            </ViewInformation>
            <Button>
              <Icon name="edit" />
            </Button>
          </InformationContainer>

    </PlotInformationContainer>
    
  );
};
