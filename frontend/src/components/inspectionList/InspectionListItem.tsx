import { useState } from 'react';
import { InspectionDisplay } from '../../types/types';
import InspectionItemDetails from './InspectionItemDetails';

type InspectionListItemProps = {
  inspection: InspectionDisplay;
};

const InspectionListItem = ({ inspection }: InspectionListItemProps) => {
  const inspectionDate = new Date(inspection.date);
  const year = inspectionDate.getFullYear();
  const month = String(inspectionDate.getMonth() + 1).padStart(2, '0');
  const day = String(inspectionDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const [detailed, setDetailed] = useState<boolean>(false);
  // if (detailed) console.log(inspection);

  const handleDrawer = () => {
    setDetailed(!detailed);
  };

  return (
    <li className='inspection-item'>
      {/* <h3 className='font-bold text-xl'>Summary:</h3> */}
      <div className='inspection-item--summary'>
        <article>
          <h4>Date:</h4> <p>{formattedDate}</p>
        </article>
        <article>
          <h4>Location:</h4> <p>{inspection.locationName}</p>
        </article>
        <article>
          <p>{inspection.isSubmitted ? 'yes' : 'no'}</p>
        </article>

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
