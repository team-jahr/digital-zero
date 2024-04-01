import { Button, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setListOfIssues } from '../store/slices/InspectionFormSlice';
import { deleteIssueFromApi } from '../api/api';

type PopUpProps = {
  id: number;
  open: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};
const PopUp = ({ id, open, setModalOpen }: PopUpProps) => {
  const issues = useSelector(
    (state: RootState) => state.inspectionForm.listOfIssues,
  );
  const dispatchIssues = useDispatch<AppDispatch>();

  const handleOk = () => {
    dispatchIssues(setListOfIssues(issues.filter((el) => el.id !== id)));
    deleteIssueFromApi(id);
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Modal footer={null} open={open} onCancel={handleCancel}>
      <div>Are you sure you want to delete this issue?</div>
      <div>
        <Button type='default' onClick={handleCancel}>
          Cancel
        </Button>
        <Button danger onClick={handleOk}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default PopUp;
