import { Inspection } from '../../types/types';
import './InspectionList.css';

type InspectionProp = {
  inspection: Inspection;
};

const InspectionListItem = ({ inspection }: InspectionProp) => {
  const inspectionDate = new Date(inspection.date);

  const year = inspectionDate.getFullYear();
  const month = String(inspectionDate.getMonth() + 1).padStart(2, '0');
  const day = String(inspectionDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <li className='inspection-item'>
      <h3>Date: {formattedDate}</h3>
      <h3>Is Submitted: {inspection.isSubmitted ? 'yes' : 'no'}</h3>
    </li>
  );
};

export default InspectionListItem;
