import { FC } from 'react';
import { Drug } from '../../types';
import Typography from '../typography';
import styled from 'styled-components';
import { breakpoints, devices } from '../../styles';
import { formatDate } from '../../utils';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  border: solid 1px ${props => props.theme.colors.gray3};
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
`;
const StyledFullRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledCaptionContainer = styled(StyledFullRowContainer)`
  align-items: center;
  margin-bottom: 15px;
`;

const StyledTagContainer = styled(StyledFullRowContainer)`
  flex-wrap: wrap;
  margin-bottom: 15px;
  @media (max-width: ${breakpoints['mobileS']}) {
    flex-direction: column;
  }
`;
const StyledTag = styled.div`
  background-color: ${props => props.theme.colors.gray3};
  margin-right: 7px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
  padding: 5px 10px;
  @media ${devices['desktop']} {
    padding: 10px 15px;
  }
  @media (max-width: ${breakpoints['mobileS']}) {
    margin: 5px 0;
  }
`;

interface DrugCardProps {
  drug: Drug;
}

export const DrugCard: FC<DrugCardProps> = ({ drug }) => {
  return (
    <StyledContainer>
      <StyledCaptionContainer>
        <Typography variant={'h6'} color={'primary'} width={'50%'}>
          {drug.name}
        </Typography>
        <Typography
          variant={'body1'}
          color={'secondary'}
          align={'right'}
          width={'100%'}
        >
          {formatDate(drug.released, 'DD/MM/YYYY')}
        </Typography>
      </StyledCaptionContainer>
      <StyledTagContainer>
        {drug.diseases.map(disease => (
          <StyledTag key={disease}>
            <Typography variant={'body1'} color={'primary'} align={'center'}>
              {disease}
            </Typography>
          </StyledTag>
        ))}
      </StyledTagContainer>
      <Typography variant={'body1'} color={'primary'}>
        {drug.description}
      </Typography>
    </StyledContainer>
  );
};
