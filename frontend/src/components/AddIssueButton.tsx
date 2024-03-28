import { useState } from 'react';
import { Button, Drawer } from 'antd';
import IssueForm from './IssueForm';
import './IssueForm.css';

type AddIssueButtonProp = {
  onAddIssue: () => void;
};

const AddIssueButton = ({ onAddIssue }: AddIssueButtonProp) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleAddIssue = () => {
    onAddIssue();
    showDrawer();
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
      <Drawer
        title='Add Issue'
        placement='right'
        closable={true}
        onClose={onCloseDrawer}
        open={isDrawerVisible}
        width={500}
      >
        <IssueForm />
      </Drawer>
    </>
  );
};

export default AddIssueButton;
