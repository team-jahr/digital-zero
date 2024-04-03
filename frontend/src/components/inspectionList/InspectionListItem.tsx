import { InspectionDisplay } from '../../types/types';
import DetailButton from './DetailButton';

type InspectionListItemProps = {
  inspection: InspectionDisplay;
  onViewDetails: (inspection: InspectionDisplay) => void;
};

const InspectionListItem = ({
  inspection,
  onViewDetails,
}: InspectionListItemProps) => {
  const inspectionDate = new Date(inspection.date);
  const year = inspectionDate.getFullYear();
  const month = String(inspectionDate.getMonth() + 1).padStart(2, '0');
  const day = String(inspectionDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const handleViewDetails = () => {
    onViewDetails(inspection);
  };

  return (
    <li className='inspection-item'>
      <h3>Date: {formattedDate}</h3>
      <h3>Is Submitted: {inspection.isSubmitted ? 'yes' : 'no'}</h3>
      <DetailButton onClick={handleViewDetails} />
      {inspection.isSelected && (
        <div>
          <h4>Description: {inspection.description}</h4>
          <h4>Issues:</h4>
          {/* <ul>
            {inspection.issueKeys.map((issueKey, index) => (
              <li key={index}>{issueKey.inspectionId}</li>
            ))}
          </ul> */}
        </div>
      )}
    </li>
  );
};

export default InspectionListItem;
