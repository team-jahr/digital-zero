import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './IssueForm.css';

type Inputs = {
  title: string;
  severity: string;
  description: string;
};

const IssueForm = () => {
  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='title'>Title</label>
      <input
        id='title'
        type='text'
        {...register('title', { required: true })}
      />

      <label htmlFor='severity'>Severity Level</label>
      <select id='severity' {...register('severity', { required: true })}>
        <option value='notification'>Notification</option>
        <option value='warning'>Warning</option>
        <option value='critical'>Critical</option>
        <option value='alert'>Alert</option>
        <option value='emergency'>Emergency</option>
      </select>

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        {...register('description', { required: true })}
      />

      {/* Below is where you can add logic for adding a picture */}
      {/* Add your picture input logic here */}

      <button type='submit'>Add Issue</button>
    </form>
  );
};

export default IssueForm;
