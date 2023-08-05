export const breakpoints = {
  mobileS: '20rem', //320px
  mobileM: '23.438rem', //375px
  mobileL: '26.563rem', //425px
  tablet: '40rem', ///640px
  laptop: '64rem', //1024px
  laptopL: '90rem', //1440px
  desktop: '160rem', //2560px
};
export const devices = {
  mobileS: `(min-width: ${breakpoints.mobileS})`,
  mobileM: `(min-width: ${breakpoints.mobileM})`,
  mobileL: `(min-width: ${breakpoints.mobileL})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  laptop: `(min-width: ${breakpoints.laptop})`,
  laptopL: `(min-width: ${breakpoints.laptopL})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  desktopL: `(min-width: ${breakpoints.desktop})`,
};
