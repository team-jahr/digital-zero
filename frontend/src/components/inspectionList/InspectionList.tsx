import { useState, useEffect } from 'react';
import { fetchInspections } from '../../api/api';
import InspectionListItem from './InspectionListItem';
import { Inspection } from '../../types/types';
import './InspectionList.css';

const InspectionList = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);

  useEffect(() => {
    fetchInspections()
      .then((data) => setInspections(data.inspectionDTOs))
      .catch((error) => console.error('Error fetching inspections:', error));
  }, []);

  return (
    <div className='inspection-list-container'>
      <h1 className='title-inspection-list'>Inspection List</h1>
      <ul className='inspection-list'>
        {inspections.map((inspection) => (
          <InspectionListItem key={inspection.id} inspection={inspection} />
        ))}
      </ul>
    </div>
  );
};

export default InspectionList;
