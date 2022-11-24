import styled from 'styled-components/native';
import { RFHeight, RFWidth, RFFontSize } from '../../utils/getResponsiveSizes';
import { Feather } from '@expo/vector-icons';

export const SampleInformationContainer = styled.View`
  flex: 1;
  flexDirection: row;
  flexWrap: wrap;
  alignItems: center;
  justify-content: space-between;
  width: 100%;
  padding: ${RFWidth(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFWidth(6)}px;
  margin: ${RFHeight(8)}px;
`;

export const SampleName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

export const SampleData = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFFontSize(35)}px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const SampleDelete = styled.TouchableOpacity``;