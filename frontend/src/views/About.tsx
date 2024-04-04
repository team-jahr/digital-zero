import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewInspectionForm } from '../api/api.ts';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListInspections = () => {
    navigate('/');
  };

  const handleNewInspection = () => {
    createNewInspectionForm(dispatch, navigate);
  };

  return (
    <div className='home-page-container mt-20'>
      <div className='background'></div>
      <article className='article-container'>
        <h1>A complete inspection solution for your company</h1>
        <h2>Key Features:</h2>
        <ul>
          <li>
            <i className='fas fa-check'></i> User Authentication
          </li>
          <li>
            <i className='fas fa-check'></i> Location and Area Selection
          </li>
          <li>
            <i className='fas fa-check'></i> Taking Pictures
          </li>
          <li>
            <i className='fas fa-check'></i> Creating New Inspections
          </li>
          <li>
            <i className='fas fa-check'></i> Submitting Inspections
          </li>
          <li>
            <i className='fas fa-check'></i> Email Notification
          </li>
          <li>
            <i className='fas fa-check'></i> Retrieving Inspections
          </li>
          <li>
            <i className='fas fa-check'></i> View Inspection Details
          </li>
        </ul>
      </article>
      <div className='button-articles-container'>
        <div className='button-article'>
          <h2>New Inspection</h2>
          <h3 className='description'>
            Start a new inspection to assess the current status of your project,
            property, or equipment. Create detailed reports, track progress, and
            manage tasks efficiently.
          </h3>
          <button className='primary-button' onClick={handleNewInspection}>
            New Inspection
          </button>
        </div>
        <div className='button-article'>
          <h2>List Inspections</h2>
          <h3 className='description'>
            View a comprehensive list of all inspections conducted within your
            organization. Access detailed reports, review findings, and track
            historical data to ensure compliance and quality standards.
          </h3>
          <button className='primary-button' onClick={handleListInspections}>
            List Inspections
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
