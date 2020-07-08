export const getSeedTitle = (type, seed) => {
  checkForNull(seed);
  let title = '';

  if (seed.artists) {
    title = `${seed.name} - ${seed.artists[0].name}`;
  } else if (seed.name) {
    title = seed.name;
  } else if (seed.id) {
    title = seed.id;
  } else {
    title = seed + '';
  }

  return title;
};

const checkForNull = (str) => {
  if (str === null || str === 'undefined')
    throw new Error('Passed value cannot be null');
};
