import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MainApp from './MainApp';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/new-inspection/*' element={<MainApp />} />
      <Route path='/list-inspections/*' element={<MainApp />} />
    </Routes>
  );
};

export default App;
