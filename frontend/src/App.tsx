import { Routes, Route } from 'react-router-dom';
import About from './views/About.tsx';
import MainApp from './views/MainApp.tsx';
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
        <Route path='/filtered/*' element={<InspectionList />} />
      </Routes>
    </>
  );
};

export default App;
