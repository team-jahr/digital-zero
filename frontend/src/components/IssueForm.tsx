import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios'; // Import Axios for making HTTP requests

type Inputs = {
  title: string;
  severity: string;
  description: string;
};

const IssueForm = () => {
  const { handleSubmit, register, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Send a POST request to the backend with form data
      await axios.post('your_backend_url_here', data);
      console.log('Issue saved successfully!');
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error saving issue:', error);
    }
  };

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

      <button className='save-issue-button' type='submit'>
        Save Issue
      </button>
    </form>
  );
};

export default IssueForm;
