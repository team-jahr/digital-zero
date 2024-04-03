import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddPictureButton from './AddPictureButton';
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
import { Issue, IssueFormInputs } from '../types/types.ts';
import toast from 'react-hot-toast';
import IssueDescriptionInput from './issueFormInputs/IssueDescriptionInput.tsx';
import IssueSeverityLevelInput from './issueFormInputs/IssueSeverityLevelInput.tsx';
import IssueTitleInput from './issueFormInputs/IssueTitleInput.tsx';
import PopUp from './genericComponents/PopUp.tsx';
import {
  setIsModalOpen,
  setPopUpCancelButton,
  setPopUpConfirmButton,
  setPopUpMessage,
} from '../store/slices/PopUpSlice.ts';
import PictureUpload from './issueFormInputs/PictureUpload.tsx';
import PictureEnlarge from './issueFormInputs/PictureEnlarge.tsx';

const IssueForm = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.popUp.isModalOpen,
  );
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IssueFormInputs>({
    mode: 'onChange',
  });

  const editIssue = useSelector(
    (state: RootState) => state.inspectionForm.editIssue,
  );
  const pictures = useSelector((state: RootState) => state.issueForm.pictures);
  const formId = useSelector((state: RootState) => state.app.formId);
  const dispatch = useDispatch<AppDispatch>();
  const onResetButton = () => {
    dispatch(setIsModalOpen(true));
    dispatch(setPopUpMessage('Are you sure you want to reset form?'));
    dispatch(setPopUpConfirmButton('Yes'));
    dispatch(setPopUpCancelButton('No'));
  };

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

  const onSubmit: SubmitHandler<IssueFormInputs> = async (data) => {
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

  const handleReset = () => {
    reset();
    dispatch(setPictures([]));
    dispatch(setEnlargedImage(null));
    dispatch(setIsModalOpen(false));
  };

  return (
    <>
      <PictureEnlarge />
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <IssueTitleInput register={register} errors={errors} />
        <IssueSeverityLevelInput register={register} />
        <IssueDescriptionInput register={register} errors={errors} />
        <AddPictureButton onPicturesAdded={handlePicturesAdded} />
        <PictureUpload />

        <div className='buttons-container-fixed'>
          <button
            className='danger-button'
            type='button'
            onClick={onResetButton}
          >
            Reset
          </button>
          <button className='save-issue-button' type='submit'>
            Save Issue
          </button>
        </div>
      </form>
      <PopUp
        open={isModalOpen}
        handleOk={handleReset}
        setModalOpen={() => dispatch(setIsModalOpen(false))}
      />
    </>
  );
};

export default IssueForm;
