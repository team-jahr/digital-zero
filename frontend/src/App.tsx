import { Routes, Route } from 'react-router-dom';
import About from './About';
import MainApp from './MainApp';
import NavBar from './components/NavBar';
import InspectionList from './components/inspectionList/InspectionList';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/about/*' element={<About />} />
        <Route path='/new-inspection/*' element={<MainApp />} />
        <Route path='/' element={<InspectionList />} />
      </Routes>
    </>
  );
};

export default App;
