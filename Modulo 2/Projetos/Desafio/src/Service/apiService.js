import { getAll } from '../Service/HttpService';
export async function apiGetAllCities() {
  const allCities = await getAll('/cities');
  return allCities;
}
export async function apiGetAllCandidates() {
  const allCandidates = await getAll('/candidates');
  const returnCandidates = allCandidates.map(candidate => {
    return { ...candidate, imgPath: `./img/${candidate.username}.png` };
  });
  return returnCandidates;
}

export async function apiGetInfoByCity(cityID) {
  const infoByCity = await getAll(`/election?cityId=${cityID}`);
  return infoByCity;
}
