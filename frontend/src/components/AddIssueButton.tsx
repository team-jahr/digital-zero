import { useState } from 'react';
import { Button, Drawer } from 'antd';
import IssueForm from './IssueForm';
import './IssueForm.css';

const AddIssueButton = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleAddIssue = () => {
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
