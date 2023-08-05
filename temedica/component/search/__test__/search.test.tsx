import { render, screen } from '../../../utils';
import { drugSearchResultSuccess } from '../../../__mock__/drugSearchResult';
import Search from '../index';
import { useDrugSearch } from '../../../hooks/drugHook';
import { QueryObserverResult } from 'react-query';
import { Drug } from '../../../types';

jest.mock('next/router');
jest.mock('../../../hooks/drugHook', () => ({
  useDrugSearch: jest.fn(),
}));

const mockedUseDrugSearch = useDrugSearch as jest.Mock<
  ReturnType<typeof useDrugSearch>
>;

describe('Search component should render result according url params', () => {
  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: { q: 'Folic' },
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });

  test('useDrugSearch should correctly display result', async () => {
    mockedUseDrugSearch.mockImplementation(
      () =>
        ({
          data: drugSearchResultSuccess.data,
          isError: false,
          isLoading: false,
          isSuccess: true,
        } as QueryObserverResult<Drug[]>),
    );
    render(<Search />);
    const resultMessage = screen.queryByText('Showing 1 result');
    expect(resultMessage).toBeInTheDocument();
  });

  test('useDrugSearch should correctly display returned data', async () => {
    mockedUseDrugSearch.mockImplementation(
      () =>
        ({
          data: drugSearchResultSuccess.data,
          isError: false,
          isLoading: false,
          isSuccess: true,
        } as QueryObserverResult<Drug[]>),
    );
    render(<Search />);
    const resultMessage = screen.queryByText('Folic Acid AAAAAAAAAAAAAAAAA');
    expect(resultMessage).toBeInTheDocument();
  });

  test('useDrugSearch should correctly display loading message.', async () => {
    mockedUseDrugSearch.mockImplementation(
      () =>
        ({
          data: null,
          isError: false,
          isLoading: true,
          isSuccess: false,
        } as unknown as QueryObserverResult<Drug[]>),
    );
    render(<Search />);
    const loadingMessage = screen.queryByText('Searching...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('useDrugSearch should correctly display Notfound message.', async () => {
    mockedUseDrugSearch.mockImplementation(
      () =>
        ({
          data: [],
          isError: false,
          isLoading: false,
          isSuccess: true,
        } as unknown as QueryObserverResult<Drug[]>),
    );
    render(<Search />);
    const loadingMessage = screen.queryByText('Nothing Found.');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('useDrugSearch should correctly display error message.', async () => {
    mockedUseDrugSearch.mockImplementation(
      () =>
        ({
          data: null,
          isError: true,
          error: new Error('Sorry, some thing is wrong.Please try later.'),
          isLoading: false,
          isSuccess: false,
        } as unknown as QueryObserverResult<Drug[]>),
    );
    render(<Search />);
    const loadingMessage = screen.queryByText(
      'Sorry, some thing is wrong.Please try later.',
    );
    expect(loadingMessage).toBeInTheDocument();
  });
});
