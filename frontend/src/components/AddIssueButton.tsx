import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import IssueForm from './IssueForm';

import './InspectionFormStyles.css';




const AddIssueButton = ({ onAddIssue }) => {
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

  const handleSubmit = (values) => {
    // Logic to handle form submission
    console.log('Form values:', values);
    onCloseDrawer();
  };

  return (
    <>
      <Button
        type='primary'
        className='add-issue-button'
        onClick={handleAddIssue}
      >
        Add Issue
      </Button>
      <Drawer
        title='Add Issue'
        placement='right'
        closable={true}
        onClose={onCloseDrawer}
        visible={isDrawerVisible}
        width={500}
      >
        <IssueForm onSubmit={handleSubmit} />
      </Drawer>
    </>
  );
};

export default AddIssueButton;
