import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { render as reactRender } from '@testing-library/react';
import { GlobalStyle, theme } from '../styles';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});
/**
 *  This function is used for rendering hook which use ReactQuery hook
 * @param ui
 */
export const reactQueryHookWrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

/**
 *  This function is used for rendering component which use ReactQuery
 * @param ui
 */
function render(ui: React.ReactElement) {
  return reactRender(
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </QueryClientProvider>
    </>,
  );
}

// re-export everything
export * from '@testing-library/react';
export { render };
