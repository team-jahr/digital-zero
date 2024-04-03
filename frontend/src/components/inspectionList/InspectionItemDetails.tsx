import { Drawer } from 'antd';
import { InspectionDisplay } from '../../types/types';

interface Props {
  inspectionDisplay: InspectionDisplay;
  visible: boolean;
  onClose: () => void;
}

const InspectionItemDetails = ({
  inspectionDisplay,
  visible,
  onClose,
}: Props) => {
  return (
    <Drawer
      title='Details'
      open={visible}
      placement='right'
      onClose={onClose}
      width={500}
    >
      <article>
        <div>Date: {inspectionDisplay.date}</div>
        <div>Location: {inspectionDisplay.locationName}</div>
        <div>Area: {inspectionDisplay.areaName}</div>
        <div>Reported: {inspectionDisplay.isSubmitted}</div>
        <div>Reported to: {inspectionDisplay.reportedToEmails} </div>
        <div>Description: {inspectionDisplay.description}</div>

        <div>Issues:</div>
      </article>
    </Drawer>
  );
};

export default InspectionItemDetails;
