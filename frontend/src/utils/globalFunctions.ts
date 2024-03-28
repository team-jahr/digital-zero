import { allMockedLocations, mockedUser } from '../data/data';
import { Location, User } from '../types/types';

export const fetchLocations = (url: string): Promise<Location[]> => {
  return new Promise((resolve, reject) => {
    if (url === 'kindly break') {
      reject('Error');
    } else {
      resolve(allMockedLocations);
    }
  });
};

export const fetchUser = (url: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (url === 'kindly break') {
      reject('Error');
    } else {
      resolve(mockedUser);
    }
  });
};
