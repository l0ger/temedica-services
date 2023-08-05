import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SearchInput } from './searchInput';
import styled from 'styled-components';
import { DrugCard } from '../drugCard/drugCard';
import { Drug } from '../../types';
import { UrlHelper } from '../../utils';
import Typography from '../typography';
import { useRouter } from 'next/router';
import { useDrugSearch } from '../../hooks/drugHook';

const StyledContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  height: 100%;
  width: 100%;
  ul {
    width: 100%;
    margin-top: 10px;
  }
`;
const StyledSearchResultMessageContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const Search: FC = () => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string | undefined>(
    router.query.q as string,
  );
  const {
    isError,
    isSuccess,
    isLoading,
    error,
    data: drugs,
  } = useDrugSearch(searchWord);
  const onSearch = useCallback((searchKey: string) => {
    setSearchWord(searchKey);
    if (!searchKey) {
      UrlHelper.addQueryParam('q', '');
    }
  }, []);

  const onClear = () => {
    setSearchWord('');
    UrlHelper.addQueryParam('q', '');
  };

  useEffect(() => {
    if (searchWord) {
      UrlHelper.addQueryParam('q', searchWord);
    }
  }, [searchWord]);

  const validation = useMemo(
    () => ({
      test: (value: string) => /^[a-zA-Z0-9_.-]*$/.test(value), //number and letter only
      message: 'Please use letter and number only.',
    }),
    [],
  );
  return (
    <StyledContainer>
      <SearchInput
        onSearch={onSearch}
        onClear={onClear}
        defaultValue={searchWord}
        validation={validation}
      />
      <StyledSearchResultMessageContainer>
        {isSuccess && (
          <Typography
            align={'left'}
            variant={'subheading1'}
            color={'secondary'}
          >
            {drugs && drugs.length > 0
              ? `Showing ${drugs?.length} result`
              : 'Nothing Found.'}
          </Typography>
        )}
        {isLoading && (
          <Typography
            variant={'subheading1'}
            color={'secondary'}
            align={'center'}
          >
            Searching...
          </Typography>
        )}
        {isError && error && (
          <Typography align={'center'} color={'error'} variant={'subheading1'}>
            {(error as Error)?.message as string}
          </Typography>
        )}
      </StyledSearchResultMessageContainer>
      <ul>
        {drugs?.map((drug: Drug) => (
          <li key={drug.id}>
            <DrugCard drug={drug} />
          </li>
        ))}
      </ul>
    </StyledContainer>
  );
};

export default Search;
