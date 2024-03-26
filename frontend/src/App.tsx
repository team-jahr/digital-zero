import { useEffect, useState } from 'react';
import './App.css';
import { fetchHelloWorld } from './globalFunctions';
import { Hello } from './types';

function App() {
  const [greetings, setGreetings] = useState<Hello[]>();

  useEffect(() => {
    fetchHelloWorld()
      .then((res) => setGreetings(res))
      .catch(() => console.log('Error while fetching'));
  }, []);

  return (
    <>
      {greetings !== undefined && (
        <div>
          {greetings.map((el) => {
            return <div>{el.msg}</div>;
          })}
        </div>
      )}
    </>
  );
}

export default App;
