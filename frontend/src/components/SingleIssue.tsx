import { Issue } from '../types/types.ts';
import './SingleIssueStyle.css';
import PopUp from './PopUp';
import { FormEvent, useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store.ts';
import {
  setEnlargedImage,
  setPictures,
  setShowDrawer,
} from '../store/slices/IssueFormSlice.ts';
import { setEditIssue } from '../store/slices/InspectionFormSlice.ts';

type SingleIssueProp = {
  issue: Issue;
};
const SingleIssue = ({ issue }: SingleIssueProp) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setEditIssue(issue));
    dispatch(setPictures([]));
    dispatch(setEnlargedImage(null));
    dispatch(setShowDrawer(true));
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
      <PopUp id={issue.id} open={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default SingleIssue;
