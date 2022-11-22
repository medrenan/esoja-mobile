import styled from 'styled-components/native';
import { RFHeight, RFWidth, RFFontSize } from '../../utils/getResponsiveSizes';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const PlotInformationContainer = styled.TouchableOpacity`
  flex-flow: row;
  align-items: center;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFWidth(6)}px;
  margin-top: ${RFHeight(8)}px;
  
`;

export const InformationContainer = styled.View`
  flexDirection: row;
  alignItems: center;
  justify-content: space-between;
  flex: 1;
  padding-left: ${RFWidth(16)}px;
  width:100%;
  
`;

export const ViewInformation = styled.TouchableOpacity`
  maxWidth:80%;
  
`;

export const PlotName = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export const PlotCropYear = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const PlotArea = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const PlotProduction = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
export const Icon = styled(Feather)`
  font-size: ${RFFontSize(35)}px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const AddButton = styled(RectButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.primary};

  padding: 10px;
  margin: 35px;
  border-radius: 50px;
`;
