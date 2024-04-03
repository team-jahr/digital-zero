import { Drawer } from 'antd';
import { InspectionDisplay } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setEditMode } from '../../store/slices/EditModeSlice';

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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = () => {
    dispatch(setEditMode(true));
    navigate(`/new-inspection/${inspectionDisplay.id}`);
  };
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

        <div>Issues: {inspectionDisplay.issues.length}</div>
      </article>
      <button className='success-button' onClick={handleEdit}>
        Edit
      </button>
    </Drawer>
  );
};

export default InspectionItemDetails;
