// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ReactTestInstance} from 'react-test-renderer';

export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeEmpty(): R;
      toContainElement(element: ReactTestInstance | null): R;
      toHaveProp(prop: string, value?: any): R;
      toHaveTextContent(
        text: string | RegExp,
        options?: {normalizeWhitespace: boolean},
      ): R;
      toHaveStyle(style: object[] | object): R;
    }
  }
}
