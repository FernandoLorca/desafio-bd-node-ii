export const handleErrors = code => {
  if (!code) {
    return {
      code: 500,
      msg: 'Server error, unknown error',
    };
  }

  switch (code) {
    case '22P02':
      return {
        status: 400,
        msg: 'Parameter format not valid',
      };

    case '400':
      return {
        status: 404,
        msg: 'Data is missing',
      };

    case '404':
      return {
        status: 404,
        msg: 'Register dont exist',
      };

    default:
      return {
        status: 500,
        msg: 'Server error, unknown error',
      };
  }
};
