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
  // 加载环境变量
  let environment = null;
  if (ENVIRONMENTS) {
    try {
      environment = require(path.resolve(__dirname, ENVIRONMENTS));
      console.log('环境变量加载成功:', environment.name);
    } catch (error) {
      console.error('环境变量加载失败:', error.message);
    }
  }

  newman.run({
    collection: combinedCollection,
    reporters: 'cli',
    environment: environment
  }, function (err, summary) {
    if (err) {
      console.error('Newman 运行错误:', err.message);
      throw err;
    }
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
    try {
      const tempCollection = require(path.resolve(__dirname, currentValue));

      // 安全检查：确保 tempCollection 和 tempCollection.info 存在
      if (tempCollection && tempCollection.info && tempCollection.info.name) {
        accumulator.info.name += `_${tempCollection.info.name}`;
      } else {
        // 如果没有 name，使用文件名作为替代
        const fileName = path.basename(currentValue, '.json');
        accumulator.info.name += `_${fileName}`;
      }

      // 安全检查：确保 item 和 variable 是数组
      if (tempCollection && Array.isArray(tempCollection.item)) {
        accumulator.item = accumulator.item.concat(tempCollection.item);
      }

      if (tempCollection && Array.isArray(tempCollection.variable)) {
        accumulator.variable = accumulator.variable.concat(tempCollection.variable);
      }

      return accumulator;
    } catch (error) {
      console.warn(`警告: 无法加载集合文件 ${currentValue}: ${error.message}`);
      return accumulator;
    }
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
