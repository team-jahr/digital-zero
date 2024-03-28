import { Area, Location, User } from '../types/types';

export const user = {
  id: '1',
  name: 'John Doe',
  location: {
    id: '1',
    name: 'Stockholm',
    area: [
      { id: '1', name: 'Hall 111' },
      { id: '2', name: 'Hall 222' },
    ],
  },
};
export const location = [
  {
    id: '1',
    name: 'Stockholm',
    area: [
      { id: '1', name: 'Hall 111' },
      { id: '2', name: 'Hall 222' },
    ],
  },
  {
    id: '2',
    name: 'Uppsala',
    area: [
      { id: '1', name: 'Hall 333' },
      { id: '2', name: 'Hall 444' },
      { id: '3', name: 'Hall 555' },
    ],
  },
  {
    id: '3',
    name: 'Malmö',
    area: [
      { id: '1', name: 'Hall 666' },
      { id: '2', name: 'Hall 777' },
      { id: '3', name: 'Hall 888' },
    ],
  },
];

/**
 * -----------------------------------------------------------------------------
 */
export const mockedArea: Area = {
  id: '1',
  name: 'Hall 111',
};

export const allMockedLocations: Location[] = [
  {
    id: '1',
    name: 'Avesta',
    area: [
      { id: '1', name: 'Hall 111' },
      { id: '2', name: 'Hall 222' },
    ],
  },
  {
    id: '2',
    name: 'Stockholm',
    area: [
      { id: '3', name: 'Hall 333' },
      { id: '4', name: 'Hall 444' },
    ],
  },
  {
    id: '3',
    name: 'Uppsala',
    area: [
      { id: '5', name: 'Hall 555' },
      { id: '6', name: 'Hall 666' },
    ],
  },
];

export const mockedUser: User = {
  id: '1',
  name: 'John Doe',
  location: allMockedLocations[0],
};