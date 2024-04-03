import { useDispatch } from 'react-redux';
import { setShowDrawer } from '../store/slices/IssueFormSlice.ts';

const AddIssueButton = () => {
  const dispatch = useDispatch();

  const handleAddIssue = () => {
    dispatch(setShowDrawer(true));
  };

  return (
    <>
      <button type='button' className='primary-button' onClick={handleAddIssue}>
        Create new issue
      </button>
    </>
  );
};

export default AddIssueButton;
