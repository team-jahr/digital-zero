import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MainApp from './MainApp';
import NavBar from './components/NavBar';
import InspectionList from './components/inspectionList/InspectionList';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new-inspection/*' element={<MainApp />} />
        <Route path='/list-inspections/*' element={<InspectionList />} />
      </Routes>
    </>
  );
};

export default App;
