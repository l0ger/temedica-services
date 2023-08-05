const dateFormats = ['YYYY-MM-DD', 'DD/MM/YYYY'];
export const formatDate = (date: string, format: string) => {
  if (!dateFormats.includes(format)) {
    return 'Invalid format';
  } else if (!date) {
    return '';
  }
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  let formatedStr = format.replace('YYYY', String(year));
  formatedStr = formatedStr.replace('MM', String(month));
  formatedStr = formatedStr.replace('DD', String(day));
  return formatedStr;
};
