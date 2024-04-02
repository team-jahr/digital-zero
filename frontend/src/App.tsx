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
        <Route path='/about/*' element={<HomePage />} />
        <Route path='/new-inspection/*' element={<MainApp />} />
        <Route path='/' element={<InspectionList />} />
      </Routes>
    </>
  );
};

export default App;
