import { useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddPictureButton from './AddPictureButton';
import './IssueForm.css';
import { fetchInspectionIssues, formatImages } from '../api/api.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import {
  setEditIssue,
  setListOfIssues,
} from '../store/slices/InspectionFormSlice.ts';
import {
  setEnlargedImage,
  setPictures,
} from '../store/slices/IssueFormSlice.ts';
import { Issue } from '../types/types.ts';
import toast from 'react-hot-toast';

type Inputs = {
  title: string;
  severity: string;
  description: string;
};

const IssueForm = () => {
  const { handleSubmit, register, reset, setValue } = useForm<Inputs>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editIssue = useSelector(
    (state: RootState) => state.inspectionForm.editIssue,
  );
  const pictures = useSelector((state: RootState) => state.issueForm.pictures);
  const formId = useSelector((state: RootState) => state.app.formId);
  const dispatch = useDispatch<AppDispatch>();
  const enlargedImage = useSelector(
    (state: RootState) => state.issueForm.enlargedImage,
  );

  useEffect(() => {
    if (editIssue !== null) {
      dispatch(
        setPictures(
          editIssue.images.map((el) => (el = 'data:image/png;base64,' + el)),
        ),
      );
      setValue('title', editIssue.title);
      setValue('description', editIssue.description);
      setValue('severity', editIssue.severity);
    }
  }, [editIssue, dispatch, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let transformedImages: string[];
    if (pictures.length > 0) {
      transformedImages =
        pictures && [...pictures].map((el) => formatImages(el));
    } else {
      transformedImages = [];
    }
    const issue: Issue = {
      id: formId!,
      title: data.title,
      description: data.description,
      severity: data.severity,
      images: transformedImages,
    };

    const body = issue;

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
      url = `${import.meta.env.VITE_API_BASE_URL}/api/issues/${editIssue.id}`;
      options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
    }

    if (formId !== undefined) {
      fetch(url, options)
        .then((res) => res.json())
        .then(() => {
          reset();
          dispatch(setPictures([]));
          dispatch(setEnlargedImage(null));
        })
        .catch(() => toast.error('Failed to submit issue'))
        .then(() => fetchInspectionIssues(formId))
        .then((issues) => dispatch(setListOfIssues(issues)))
        .then(() => {
          if (editIssue === null) {
            toast.success('Issue has been added!');
          } else {
            toast.success('Issue has been updated!');
          }
          dispatch(setEditIssue(null));
        })
        .catch(() => toast.error('Failed to re-fetch updated issues'));
    }
  };

  const handlePicturesAdded = (newPictures: string[]) => {
    if (pictures) {
      dispatch(setPictures([...pictures, ...newPictures]));
    }
  };

  const handleDeletePicture = (index: number) => {
    if (pictures) {
      dispatch(setPictures([...pictures].filter((_, i) => i !== index)));
    }
  };

  const handlePictureAdded = (imageDataUrl: string) => {
    if (pictures) {
      dispatch(setPictures([...pictures, imageDataUrl]));
    }
  };

  const handleCancel = () => {
    reset();
    dispatch(setPictures([]));
    dispatch(setEnlargedImage(null));
  };

  const handlePictureClick = (pictureUrl: string) => {
    dispatch(setEnlargedImage(pictureUrl));
  };

  const handleCloseEnlargedImage = () => {
    dispatch(setEnlargedImage(null));
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
          {...register('description', { required: true, maxLength: 500 })}
          className='description-textarea'
        />

        {/* Picture upload logic */}
        <div className='grid grid-cols-2 gap-4 mb-4'>
          {pictures &&
            pictures.length > 0 &&
            pictures.map((picture, index) => (
              <div className='col-span-1' key={index}>
                <div
                  key={index}
                  className=''
                  onClick={() => handlePictureClick(picture)}
                >
                  <img
                    src={picture}
                    alt='Uploaded'
                    className='max-h-28 max-w-full'
                  />
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
