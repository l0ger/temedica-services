import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { devices } from '../../styles';

const StyledContainer = styled.div`
  background-color: ${props => props.theme.colors.bgPrimary};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
const StyledMain = styled.main`
  width: 100%;
  position: relative;
  background: ${props => props.theme.colors.bgOverlay};
  margin: 0;
  display: flex;
  flex-grow: 1;
  box-sizing: border-box;
  .mainCol {
    width: 100vw;
    padding: 0 4%;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .leftCol {
    float: left;
    width: 30%;
    display: none;
  }
  .rightCol {
    width: 30%;
    display: none;
  }
  @media ${devices['laptop']} {
    .leftCol {
      display: block;
    }
    .rightCol {
      display: block;
    }
    .mainCol {
      width: 40%;
    }
  }
`;
const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 2% 30%;
  background-color: ${props => props.theme.colors.bgOverlay};
  margin: 0;
  border-bottom: #e5e5e5 1px solid;
  z-index: 10;
`;
const StyledLink = styled.div`
  display: none;
  flex-direction: row-reverse;
  width: 100%;
  cursor: pointer;
  a:link {
    color: ${props => props.theme.colors.typoPrimary};
  }
  a:hover {
    color: #0070f3;
  }
  @media ${devices['laptop']} {
    display: flex;
  }
`;
const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media ${devices['laptop']} {
    justify-content: flex-start;
  }
`;
const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  min-height: 7vh;
  width: 100%;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: bold;
  @media ${devices['tablet']} {
    font-weight: normal;
    font-size: ${props => props.theme.fontSizes.md};
  }
`;

export const Layout: FC = ({ children }) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLogo>
          <Image src={'/logo.png'} width={42} height={42} />
        </StyledLogo>
        <StyledLink>
          <a href={'https://github.com/l0ger'}>Temedica</a>
        </StyledLink>
      </StyledHeader>
      <StyledMain>
        <div className={'leftCol'} />
        <div className={'mainCol'}>{children}</div>
        <div className={'rightCol'} />
      </StyledMain>
      <StyledFooter>
        <span>© 2019–2021 TEMEDICA GMBH</span>
      </StyledFooter>
    </StyledContainer>
  );
};
