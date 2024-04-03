import { useState, useEffect } from 'react';
import { fetchInspections } from '../../api/api';
import InspectionListItem from './InspectionListItem';
import { Inspection } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewInspectionForm } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './InspectionList.css';

const InspectionList = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInspections()
      .then((data) => {
        const inspectionsWithSelection = data.map((inspection) => ({
          ...inspection,
          isSelected: false,
        }));
        setInspections(inspectionsWithSelection);
      })
      .catch((error) => console.error('Error fetching inspections:', error));
  }, []);

  const handleViewDetails = (clickedInspection: Inspection) => {
    setInspections((prevInspections) =>
      prevInspections.map((inspection) => ({
        ...inspection,
        isSelected:
          inspection.id === clickedInspection.id && !inspection.isSelected,
      })),
    );
  };
  const handleNewInspection = () => {
    createNewInspectionForm(dispatch, navigate);
  };

  return (
    <div className='inspection-list-container'>
      <h1 className='title-inspection-list'>Inspection List</h1>
      <button className='transparent-button' onClick={handleNewInspection}>
        <FontAwesomeIcon icon={faSearch} />
        New Inspection
      </button>
      <button className='transparent-button-icon' onClick={handleNewInspection}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <ul className='inspection-list'>
        {inspections.map((inspection) => (
          <InspectionListItem
            key={inspection.id}
            inspection={inspection}
            onViewDetails={handleViewDetails}
          />
        ))}
      </ul>
    </div>
  );
};

export default InspectionList;
