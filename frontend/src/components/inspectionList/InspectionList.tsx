import { useState, useEffect } from 'react';
import { getInspectionDisplays } from '../../api/api';
import InspectionListItem from './InspectionListItem';
import { InspectionDisplay } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewInspectionForm } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './InspectionList.css';
import toast from 'react-hot-toast';

const InspectionList = () => {
  const [inspections, setInspections] = useState<InspectionDisplay[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getInspectionDisplays()
      .then((res) => setInspections(res))
      .catch(() => toast.error('Failed to fetch inspections'));
  }, []);
  console.log('InspectionDisplays: ', inspections);
  const handleViewDetails = (clickedInspection: InspectionDisplay) => {
    setInspections((prevInspections) =>
      prevInspections.map((inspection) => ({
        ...inspection,
        isSelected:
          inspection.id === clickedInspection.id && !inspection.isSelected,
      })),
    );
  };
  const handleNewInspection = () => {
    createNewInspectionForm(dispatch);
    navigate('/new-inspection');
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
