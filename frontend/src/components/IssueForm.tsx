import { useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddPictureButton from './AddPictureButton';
import './IssueForm.css';
import { formatImages } from '../api/api.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

type Inputs = {
  title: string;
  severity: string;
  description: string;
};

const IssueForm = () => {
  const { handleSubmit, register, reset, setValue } = useForm<Inputs>();
  const [pictures, setPictures] = useState<string[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editIssue = useSelector(
    (state: RootState) => state.inspectionForm.editIssue,
  );

  useEffect(() => {
    if (editIssue !== null) {
      setPictures(
        editIssue.images.map((el) => (el = 'data:image/png;base64,' + el)),
      );
      setValue('title', editIssue.title);
      setValue('description', editIssue.description);
      setValue('severity', editIssue.severityLevel);
    }
  }, [editIssue, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const transformedImages = [...pictures].map((el) => formatImages(el));
    const body = {
      id: 1,
      title: data.title,
      description: data.description,
      severity: data.severity,
      images: transformedImages,
    };

    let options;
    let url;
    if (editIssue === null) {
      url = `${import.meta.env.VITE_API_BASE_URL}/api/issues`;
      options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
    } else {
      console.log('Hello');
      url = `${import.meta.env.VITE_API_BASE_URL}/api/issues/${editIssue.id}`;
      options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
    }

    fetch(url, options)
      .then((res) => {
        console.log(res);
        reset();
        setPictures([]);
      })
      .catch((err) => console.log(err));
  };

  const handlePicturesAdded = (newPictures: string[]) => {
    setPictures((prevPictures) => [...prevPictures, ...newPictures]);
  };

  const handleDeletePicture = (index: number) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
  };

  const handlePictureAdded = (imageDataUrl: string) => {
    setPictures((prevPictures) => [...prevPictures, imageDataUrl]);
  };

  const handleCancel = () => {
    reset();
    setPictures([]);
  };

  const handlePictureClick = (pictureUrl: string) => {
    setEnlargedImage(pictureUrl);
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <>
      <div
        className='enlarged-image-overlay'
        style={{ display: enlargedImage ? 'block' : 'none' }}
        onClick={handleCloseEnlargedImage}
      >
        <div className='enlarged-image-container'>
          {enlargedImage && (
            <img
              src={enlargedImage}
              alt='Enlarged'
              className='enlarged-image'
            />
          )}
          <button
            className='close-enlarged-image-button'
            onClick={handleCloseEnlargedImage}
          >
            &#10005;
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='issue-form-container'>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          {...register('title', { required: true })}
          className='form-input'
        />

        <label htmlFor='severity'>Severity Level</label>
        <select
          id='severity'
          {...register('severity', { required: true })}
          className='severity-select'
        >
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
          className='description-textarea'
        />

        {/* Picture upload logic */}
        <div className='pictures-container flex'>
          {pictures.map((picture, index) => (
            <div key={index}>
              <div
                className='picture-item'
                onClick={() => handlePictureClick(picture)}
              >
                <img src={picture} alt='Uploaded' />
              </div>
              <button
                className='delete-picture-button'
                type='button'
                onClick={() => handleDeletePicture(index)}
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>

        <AddPictureButton onPicturesAdded={handlePicturesAdded} />

        <button className='save-issue-button' type='submit'>
          Save Issue
        </button>

        <button className='cancel-button' onClick={handleCancel}>
          Cancel
        </button>

        {/* Hidden file input field */}
        <input
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={(e) =>
            e.target.files !== null &&
            handlePictureAdded(URL.createObjectURL(e.target.files[0]))
          }
        />
      </form>
    </>
  );
};

export default IssueForm;
