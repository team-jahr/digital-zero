import { Issue } from '../types/types.ts';
import './SingleIssueStyle.css';
import PopUp from './genericComponents/PopUp.tsx';
import { FormEvent, useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import {
  setEnlargedImage,
  setPictures,
  setShowDrawer,
} from '../store/slices/IssueFormSlice.ts';
import {
  setEditIssue,
  setListOfIssues,
} from '../store/slices/InspectionFormSlice.ts';
import { deleteIssueFromApi } from '../api/api.ts';
import toast from 'react-hot-toast';
import {
  setPopUpCancelButton,
  setPopUpConfirmButton,
  setPopUpMessage,
} from '../store/slices/PopUpSlice.ts';

type SingleIssueProp = {
  issue: Issue;
};
const SingleIssue = ({ issue }: SingleIssueProp) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
    dispatch(setPopUpMessage('Are you sure you want to delete issue?'));
    dispatch(setPopUpConfirmButton('Yes'));
    dispatch(setPopUpCancelButton('No'));
  };
  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setEditIssue(issue));
    dispatch(setPictures([]));
    dispatch(setEnlargedImage(null));
    dispatch(setShowDrawer(true));
  };
  const issues = useSelector(
    (state: RootState) => state.inspectionForm.listOfIssues,
  );
  // const images = useSelector((state: RootState) => state.issueForm.pictures);
  const dispatchIssues = useDispatch<AppDispatch>();
  const handleOk = () => {
    try {
      dispatchIssues(
        setListOfIssues(issues.filter((el) => el.id !== issue.id)),
      );
      deleteIssueFromApi(issue.id);
      setModalOpen(false);
      toast.success('Issue deleted');
    } catch (err) {
      toast.error('Failed to delete issue');
    }
  };
  return (
    <div key={issue.id}>
      <div className='single-issue-container'>
        <h1 className='text-sm font-extralight'>{issue.title}</h1>
        <div className='buttons-container'>
          <Button
            type='default'
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          />

          <Button
            type='default'
            shape='circle'
            icon={<EditOutlined />}
            onClick={handleEdit}
          />
        </div>
      </div>
      <PopUp
        open={isModalOpen}
        setModalOpen={setModalOpen}
        handleOk={handleOk}
      />
    </div>
  );
};

export default SingleIssue;
