import cities from './Entities/city.list.json';

const fetchCities = async () => {
  return JSON.parse(JSON.stringify(cities));
};
export default fetchCities;
