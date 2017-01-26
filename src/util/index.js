
export const isBlank = value => (!value || (value.trim === ''));

export const assertNotBlank = (name, value) => {
  if (isBlank(value)) throw Error(`'${name}' should not be blank`);
};

// export const isDevEnv = () => (
//   process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development'
// );

export const extractGroupURLNameFrom = (inputText) => {
  assertNotBlank('input text, URL or group URL name', inputText);

  const httpRegexp = new RegExp('https://www.meetup.com/');

  if (httpRegexp.test(inputText)) {
    return inputText.replace(httpRegexp, '')
                    .replace(/^([^\/]+)\/?.*$/, '$1');
  }

  return inputText;
};
