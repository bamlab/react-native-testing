import { handleTextInput } from 'react-native-formik';
import BamTextInput from '@bam.tech/react-native-component-text-input';
import styled from 'styled-components/native';

export const FormikInput = styled(handleTextInput(BamTextInput))`
  align-self: center;
`;
