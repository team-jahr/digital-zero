import { useState } from 'react';
import { InspectionDisplay } from '../../types/types';
import InspectionItemDetails from './InspectionItemDetails';
import { formatDate } from '../../api/api';

type InspectionListItemProps = {
  inspection: InspectionDisplay;
};

const InspectionListItem = ({ inspection }: InspectionListItemProps) => {
  const inspectionDate = new Date(inspection.date);
  const formattedDate = formatDate(inspectionDate);
  const [detailed, setDetailed] = useState<boolean>(false);
  // if (detailed) console.log(inspection);

  const handleDrawer = () => {
    setDetailed(!detailed);
  };

  return (
    <li className='inspection-item'>
      {/* <h3 className='font-bold text-xl'>Summary:</h3> */}
      <div className='inspection-item--summary'>
        <article>{formattedDate}</article>
        <article>{inspection.locationName}</article>
        {inspection.isSubmitted ? (
          <article className='text-green-600 font-semibold'>Yes</article>
        ) : (
          <article className='text-red-600 font-semibold'>No</article>
        )}

        <button
          className='col-start-2 sm:col-start-4 max-w-28 primary-button'
          onClick={handleDrawer}
        >
          View Details
        </button>
      </div>
      <InspectionItemDetails
        inspectionDisplay={inspection}
        onClose={handleDrawer}
        visible={detailed}
      />
    </li>
  );
};

export default InspectionListItem;
