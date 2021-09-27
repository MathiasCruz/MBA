import { atom } from 'jotai';
import {CityEntity}  from '../api/Entities/entityDefinition';

export const citiesAtom = atom<CityEntity[]>([]);
