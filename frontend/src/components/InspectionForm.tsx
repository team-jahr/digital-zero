import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import AddIssueButton from './AddIssueButton';
import { InspectionFormInputs } from '../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import {
  fetchAllAreas,
  fetchAllLocations,
  fetchInspectionIssues,
  getInspection,
  submitInspectionForm,
} from '../api/api.ts';
import {
  setAreaValue,
  setDefaultLocation,
  setIsAreaDisabled,
  setIsSubmitted,
  setListOfIssues,
} from '../store/slices/InspectionFormSlice.ts';
import LocationSelectInput from './inspectionFormInputs/LocationSelectInput.tsx';
import AreaSelectInput from './inspectionFormInputs/AreaSelectInput.tsx';
import DateInput from './inspectionFormInputs/DateInput.tsx';
import EmailFields from './inspectionFormInputs/EmailFields.tsx';
import DescriptionTextArea from './inspectionFormInputs/DescriptionTextArea.tsx';
import IssuesList from './IssuesList.tsx';
import {
  setEnlargedImage,
  setPictures,
} from '../store/slices/IssueFormSlice.ts';
import { setFormId } from '../store/slices/AppSlice.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setEditMode } from '../store/slices/EditModeSlice.ts';

const InspectionForm = () => {
  const selectedLocation = useSelector(
    (state: RootState) => state.inspectionForm.selectedLocation,
  );
  const defaultLocation = useSelector(
    (state: RootState) => state.inspectionForm.defaultLocation,
  );
  const locations = useSelector(
    (state: RootState) => state.inspectionForm.allLocations,
  );
  const isSubmitted = useSelector(
    (state: RootState) => state.inspectionForm.isSubmitted,
  );
  const areas = useSelector((state: RootState) => state.inspectionForm.areas);
  const dispatch = useDispatch<AppDispatch>();
  const formId = useSelector((state: RootState) => state.app.formId);
  const navigate = useNavigate();

  const editMode = useSelector((state: RootState) => state.editMode.value);
  const [areaDefault, setAreaDefault] = useState<string>('Select Area');
  const [dateDefault, setDateDefault] = useState<string>();
  const [descriptionDefault, setDescriptionDefault] = useState<string>('');

  useEffect(() => {
    if (editMode === true && formId !== undefined) {
      getInspection(formId)
        .then((inspection) => {
          const date = new Date(inspection.date).toISOString().substring(0, 10);
          setDateDefault(date);

          dispatch(setDefaultLocation(inspection.location));
          dispatch(setAreaValue(inspection.area.name));
          setAreaDefault(inspection.area.name);
          dispatch(setIsAreaDisabled(true));

          setDescriptionDefault(inspection.description);
        })
        .then(() => dispatch(setEditMode(false)));
    } else {
      const date = new Date().toISOString().substring(0, 10);
      setDateDefault(date);
    }
  }, [editMode, dispatch, formId]);

  useEffect(() => {
    if (formId) {
      fetchInspectionIssues(formId)
        .then((issues) => dispatch(setListOfIssues(issues)))
        .then(() => dispatch(setPictures([])))
        .then(() => dispatch(setEnlargedImage(null)))
        .catch(() => console.log('Error when fetching inspection issues'));
    }
  }, [formId, dispatch]);

  useEffect(() => {
    fetchAllLocations(dispatch, defaultLocation);
    fetchAllAreas(dispatch, selectedLocation.id);
  }, [defaultLocation, selectedLocation, dispatch]);

  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm<InspectionFormInputs>({
    mode: 'onChange',
    defaultValues: {
      emails: [{ value: '' }],
    },
  });

  const onSubmit: SubmitHandler<InspectionFormInputs> = (data) => {
    if (formId) {
      // try {
      submitInspectionForm(data, locations, areas, formId, isSubmitted);
      dispatch(setListOfIssues([]));
      dispatch(setFormId(undefined));
      toast.success('Success! Redirecting to the home page...');
      dispatch(setIsAreaDisabled(false));
      dispatch(setAreaValue(''));
      // }
    } else {
      toast.error('Error: Unable to connect this inspection to database');
    }

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <h1 className='section-title'>
        <span>Basic data</span>
      </h1>
      {<DateInput dateDefault={dateDefault} register={register} />}
      <LocationSelectInput register={register} resetField={resetField} />
      <AreaSelectInput
        register={register}
        errors={errors}
        defaultValue={areaDefault}
      />
      <h1 className='section-title'>
        <span>List of issues</span>
      </h1>
      <IssuesList />
      <AddIssueButton />
      <h1 className='section-title'>
        <span>Additional information</span>
      </h1>
      <EmailFields
        register={register}
        errors={errors}
        control={control}
        isSubmitted={isSubmitted}
      />
      <DescriptionTextArea
        descriptionDefault={descriptionDefault}
        register={register}
        errors={errors}
      />
      <div className='buttons-container'>
        <button
          className='tertiary-button'
          type='submit'
          onClick={() => dispatch(setIsSubmitted(false))}
        >
          Save Draft
        </button>

        <button
          type='submit'
          className='success-button'
          onClick={() => dispatch(setIsSubmitted(true))}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InspectionForm;
