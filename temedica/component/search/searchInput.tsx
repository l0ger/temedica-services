import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { devices } from '../../styles';
import { debounce } from '../../utils';
import Typography from '../typography';

const StyledRootContainer = styled.div`
  .validationError {
    padding-left: 10px;
    padding-top: 10px;
  }
`;
const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: solid 1px ${props => props.theme.colors.borderFocus};
  border-radius: 20px;
  padding: 12px 10px;
  margin-top: 10px;
  &:focus-within {
    border-width: 2px;
  }
  .gray {
    color: ${props => props.theme.colors.darkgray};
  }
`;
const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.mobile.subheading1};
  @media ${devices['tablet']} {
    font-size: ${props => props.theme.fontSizes.tablet.subheading1};
  }
`;

const StyledLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.mobile.h6};
  padding-left: 10px;
  color: ${props => props.theme.colors.typoPrimary} @media ${devices['tablet']} {
    font-size: ${props => props.theme.fontSizes.tablet.h6};
  }
`;
const StyledClearButton = styled.button`
  background-color: transparent;
  border-radius: 20px;
  border: none;
  :hover {
    background-color: ${props => props.theme.colors.gray3};
  }
`;
interface SearchInputProps {
  onSearch: (searchKey: string) => void;
  onClear?: () => void;
  inputDelay?: number;
  defaultValue?: string;
  validation?: {
    test: (value: string) => boolean;
    message: string;
  };
}
export const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  defaultValue,
  inputDelay,
  onClear,
  validation,
}) => {
  const [validationMessage, setValidationMessage] = useState('');
  /** memorizing and debouncing onChange callback **/
  const onChangeSearch = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
        /** validating input **/
        if (validation?.test && validation.test(e.target.value)) {
          setValidationMessage('');
        } else if (validation) {
          setValidationMessage(validation?.message);
        }
        /****** **/
      }, inputDelay || 400),
    [onSearch, inputDelay, validation],
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      onClear && onClear();
      setValidationMessage('');
    }
  };
  return (
    <StyledRootContainer>
      <StyledLabel htmlFor={'searchInput'}>Search</StyledLabel>
      <br />
      <StyledInputContainer>
        <Image
          src={'/icons/search.png'}
          width={24}
          height={24}
          alt={'drug search'}
        />
        <StyledInput
          id={'searchInput'}
          type={'text'}
          placeholder={'Search by drug name or disease'}
          onChange={onChangeSearch}
          defaultValue={defaultValue}
          ref={inputRef}
        />
        {inputRef.current && inputRef.current?.value?.length ? (
          <StyledClearButton onClick={onClickClear}>
            <Typography variant={'h6'} customClass={'gray'}>
              X
            </Typography>
          </StyledClearButton>
        ) : null}
      </StyledInputContainer>
      {validationMessage && (
        <Typography
          variant={'subheading2'}
          color={'error'}
          customClass={'validationError'}
        >
          {validationMessage}
        </Typography>
      )}
    </StyledRootContainer>
  );
};
