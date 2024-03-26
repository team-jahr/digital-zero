import { Hello } from '../types/types.ts';

export const fetchHelloWorld = async (): Promise<Hello[]> => {
  const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  const url = baseUrl + '/api/inspections';

  const response: Response = await fetch(url);
  const greetings: Promise<Hello[]> = await response.json();
  return greetings;
};
