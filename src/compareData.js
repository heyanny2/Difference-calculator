import _ from 'lodash';

const compareData = (file1, file2) => {
  const uniqueKeys = _.uniq(...file1, ...file2);
  const sortedUniqueKeys = _.sortBy(uniqueKeys);

  const result = sortedUniqueKeys.map((key) => {
    if (_.has(file1, key)) && file2.includes(key)) {
      return `  ${key}`; 
    }
    if (file1.includes(key) && !file2.includes(key)) {
      return `- ${key}`;
    }
    if (!file1.includes(key) && file2.includes(key)) {
      return `- ${key}`;
    }
  })
};
export default compareData;

//сравнить файл1 и файл2 с уникальным массивом,
//если нет а файл1 