import { Drawer } from 'antd';
import { InspectionDisplay } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setEditMode } from '../../store/slices/EditModeSlice';
import { setFormId } from '../../store/slices/AppSlice';

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
    dispatch(setFormId(inspectionDisplay.id));
    navigate(`/new-inspection/${inspectionDisplay.id}`);
    window.scrollTo(0, 0);
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
        <div>Location: {inspectionDisplay.location.name}</div>
        <div>Area: {inspectionDisplay.area.name}</div>
        <div>Reported: {inspectionDisplay.isSubmitted}</div>
        <div>Reported to: {inspectionDisplay.reportedToEmails} </div>
        <div>Description: {inspectionDisplay.description}</div>

        <div>Issues: {inspectionDisplay.issues}</div>
      </article>
      <button type='button' className='success-button' onClick={handleEdit}>
        Edit
      </button>
    </Drawer>
  );
};

export default InspectionItemDetails;
