import { Button } from 'antd';
import './IssueForm.css';
import { useDispatch } from 'react-redux';
import { setShowDrawer } from '../store/slices/IssueFormSlice.ts';

const AddIssueButton = () => {
  const dispatch = useDispatch();

  const handleAddIssue = () => {
    dispatch(setShowDrawer(true));
  };

  return (
    <>
      <Button
        type='primary'
        className='primary-button'
        onClick={handleAddIssue}
      >
        Add Issue
      </Button>
    </>
  );
};

export default AddIssueButton;
