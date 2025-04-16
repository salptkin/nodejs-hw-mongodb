const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';

  if (!isString) {
    console.error('parseNumber: number is not a string');
    return defaultValue;
  }

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) {
    console.error('parseNumber: number is NaN');
    return defaultValue;
  }

  if (parsedNumber < 0) {
    console.error('parseNumber: number is negative');
    return defaultValue;
  }

  return parsedNumber;
};

const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationParams;