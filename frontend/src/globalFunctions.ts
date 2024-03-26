import { Hello } from './types';

export const fetchHelloWorld = async (): Promise<Hello[]> => {
  const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  const url = baseUrl + '/api/inspections';
  console.log(url);

  const response: Response = await fetch(url);
  const greetings: Promise<Hello[]> = await response.json();
  return greetings;
};
