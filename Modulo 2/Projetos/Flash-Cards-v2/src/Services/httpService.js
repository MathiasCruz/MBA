import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

export async function getAll(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function removeItem(url) {
  await axiosInstance.delete(url);
}

export async function CreateItem(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}
