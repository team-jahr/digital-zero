import { Issue } from '../types/types.ts';
import './SingleIssueStyle.css';
import PopUp from './PopUp';
import { FormEvent, useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type SingleIssueProp = {
  data: Issue;
};
const SingleIssue = ({ data }: SingleIssueProp) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    console.log('edit');
  };
  return (
    <div key={data.id}>
      <div className='single-issue-container'>
        <h1 className='text-sm font-extralight'>{data.title}</h1>
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
      <PopUp open={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default SingleIssue;
