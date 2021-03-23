const { inspect } = require('util');
const { data } = require('./data.js');

function processData(filter, count) {
  return data.reduce((countryAcc, country) => {
    const people = country.people.reduce((humanAcc, human) => {
      const animals = human.animals.filter((animal) => animal.name.indexOf(filter) !== -1);
      const animalLength = animals.length;
      if (animalLength > 0) { // Push "human" if he has at least 1 filtered "animal"
        humanAcc.push({
          name: `${human.name}${count ? ` [${animalLength}]` : ''}`,
          animals,
        });
      }
      return humanAcc;
    }, []);
    const peopleLength = people.length;
    if (peopleLength > 0) { // Push "country" if it has at least 1 "human"
      countryAcc.push({
        name: `${country.name}${count ? ` [${peopleLength}]` : ''}`,
        people,
      });
    }
    return countryAcc;
  }, []);
}

function main(args) {
  const count = args.indexOf('--count') !== -1;
  let filter = '';
  args.forEach((arg) => {
    if (arg.startsWith('--filter=')) {
      [, filter] = arg.split('=');
    }
  });
  return processData(filter, count);
}

if (require.main === module) {
  const value = main(process.argv.slice(2)); // Skip node path & current file
  console.log(inspect(value, false, null, true));
}

module.exports = { main, processData };
