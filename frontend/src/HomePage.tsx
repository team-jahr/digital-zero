import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewInspectionForm } from './api/api.ts';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListInspections = () => {
    navigate('/');
  };

  const handleNewInspection = () => {
    createNewInspectionForm(dispatch);
    navigate('/new-inspection');
  };

  return (
    <div className='home-page-container'>
      <div className='article'>
        <h2>Add Inspection</h2>
        <h3 className='description'>
          Start a new inspection to assess the current status of your project,
          property, or equipment. Create detailed reports, track progress, and
          manage tasks efficiently.
        </h3>
        <button className='action-button' onClick={handleNewInspection}>
          Add Inspection
        </button>
      </div>
      <div className='article'>
        <h2>List Inspections</h2>
        <h3 className='description'>
          View a comprehensive list of all inspections conducted within your
          organization. Access detailed reports, review findings, and track
          historical data to ensure compliance and quality standards.
        </h3>
        <button className='action-button' onClick={handleListInspections}>
          List Inspections
        </button>
      </div>
    </div>
  );
};

export default HomePage;
