import list from '../API/productList-2.json';

export const fetchData = async () => {
  const productList = list;
  const result = await JSON.parse(JSON.stringify(productList));
  console.log(result);
  return result;
};
