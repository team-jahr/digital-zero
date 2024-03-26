import { useEffect, useState } from 'react';
import { fetchHelloWorld } from './globalFunctions';
import { Hello } from './types';

const App = () => {
  const [greetings, setGreetings] = useState<Hello[]>();

  useEffect(() => {
    fetchHelloWorld()
      .then((res) => setGreetings(res))
      .catch(() => console.log('Error while fetching'));
  }, []);

  return (
    <>
      {
        greetings !== undefined && greetings.map(el => {
          return (
            <div key={el.id}>{el.msg}</div>
          )
        })
      }
    </>
  )
}

export default App;
