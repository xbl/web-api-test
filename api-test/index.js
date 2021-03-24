const newman = require('newman');
const fs = require('fs');
const path = require('path');

const FOLDER_KEY = '-f';
const ENVIRONMENT_KEY = '-e';
const argKeys = [FOLDER_KEY, ENVIRONMENT_KEY];

const commander = processArgs(process.argv);
console.log(commander);

const TEST_FOLDER = commander[FOLDER_KEY];
const ENVIRONMENTS = commander[ENVIRONMENT_KEY];

fs.readdir(TEST_FOLDER, (err, data) => {
  if (err) throw err;
  const combinedCollection = getCombinedCollection(data);
  runNewman(combinedCollection);
});

function runNewman(combinedCollection) {
  newman.run({
    collection: combinedCollection,
    reporters: 'cli',
    environment: ENVIRONMENTS && require(ENVIRONMENTS)
  }, function (err, summary) {
    if (err) { throw err; }
    if (isNotEmpty(summary.run.failures)) {
      console.error('collection run error!');
      return process.exit(1);
    }
    console.log('collection run complete!');
  });
}

function getCombinedCollection(data) {
  const collections = data
    .filter(filename => filename.endsWith('.json'))
    .map(filename => path.join(TEST_FOLDER, filename));

  const defaultCollection = {
    info: {
      name: '合并_'
    },
    item: [],
    variable: []
  };
  const combinedCollection = collections.reduce((accumulator, currentValue) => {
    const tempCollection = require(path.resolve(__dirname, currentValue));
    accumulator.info.name += `_${tempCollection.info.name}`;
    accumulator.item = accumulator.item.concat(tempCollection.item);
    accumulator.variable = accumulator.variable.concat(tempCollection.variable);
    return accumulator;
  }, defaultCollection);
  return combinedCollection;
}

function isNotEmpty(arr) {
  return Array.isArray(arr) && arr.length != 0;
}

function processArgs(args) {
  return args.reduce((accumulator, currentValue, index) => {
    if (argKeys.includes(currentValue)) {
      try {
        const value = args[index + 1];
        if (value) {
          accumulator[currentValue] = value;
        }
      } catch (error) {}
    }
    return accumulator;
  }, {});
}
