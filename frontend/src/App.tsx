import { useEffect, useState } from 'react';
import { fetchHelloWorld } from './globalFunctions';
import { Hello } from './types';
import InspectionForm from './components/InspectionForm';

const App = () => {
  const [greetings, setGreetings] = useState<Hello[]>();

  useEffect(() => {
    fetchHelloWorld()
      .then((res) => setGreetings(res))
      .catch(() => console.log('Error while fetching'));
  }, []);

  return (
    <>
      <InspectionForm />
      {greetings !== undefined &&
        greetings.map((el) => {
          return <div key={el.id}>{el.msg}</div>;
        })}
    </>
  );
};

export default App;
