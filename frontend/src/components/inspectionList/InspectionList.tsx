import { useState, useEffect } from 'react';
import { fetchInspections } from '../../api/api';
import InspectionListItem from './InspectionListItem';
import { Inspection } from '../../types/types';
import './InspectionList.css';
import InspectionDisplayTest from '../InspectionDisplayTest';

const InspectionList = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);

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

  return (
    <div className='inspection-list-container'>
      <h1 className='title-inspection-list'>Inspection List</h1>
      <InspectionDisplayTest />
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
