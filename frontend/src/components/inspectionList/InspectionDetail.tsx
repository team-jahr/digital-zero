import { Inspection } from '../../types/types';

type InspectionDetailProps = {
  inspection: Inspection;
};

const InspectionDetail = ({ inspection }: InspectionDetailProps) => {
  const inspectionDate = new Date(inspection.date);
  const formattedDate = inspectionDate.toISOString().split('T')[0]; // Get yyyy-MM-DD format

  return (
    <div className='inspection-detail'>
      <h2>Inspection Detail</h2>
      <p>ID: {inspection.id}</p>
      <p>Description: {inspection.description}</p>
      <p>Date: {formattedDate}</p>
      <p>Is Submitted: {inspection.isSubmitted ? 'Yes' : 'No'}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default InspectionDetail;
