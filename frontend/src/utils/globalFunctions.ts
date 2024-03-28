import { allMockedAppLocations } from '../data/data';
import { AppLocation } from '../types/types';

export const fetchLocations = (url: string): Promise<AppLocation[]> => {
  return new Promise<AppLocation[]>((resolve, reject) => {
    if (url === 'break') {
      reject('Error');
    } else {
      resolve(allMockedAppLocations);
    }
  });
};
