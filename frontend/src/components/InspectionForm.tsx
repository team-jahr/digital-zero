import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import './InspectionFormStyles.css';
import AddIssueButton from './AddIssueButton';
import { Inputs } from '../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import {
  fetchAllAreas,
  fetchAllIssues,
  fetchAllLocations,
  submitInspectionForm,
} from '../api/api.ts';
import { setIsDraft } from '../store/slices/InspectionFormSlice.ts';
import LocationSelectInput from './inspectionFormInputs/LocationSelectInput.tsx';
import AreaSelectInput from './inspectionFormInputs/AreaSelectInput.tsx';
import DateInput from './inspectionFormInputs/DateInput.tsx';
import NameInput from './inspectionFormInputs/NameInput.tsx';
import EmailCheckbox from './inspectionFormInputs/EmailCheckbox.tsx';
import EmailFields from './inspectionFormInputs/EmailFields.tsx';
import DescriptionTextArea from './inspectionFormInputs/DescriptionTextArea.tsx';
import IssuesList from './IssuesList.tsx';

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
  const isDraft = useSelector(
    (state: RootState) => state.inspectionForm.isDraft,
  );
  const listOfIssues = useSelector(
    (state: RootState) => state.inspectionForm.listOfIssues,
  );
  const areas = useSelector((state: RootState) => state.inspectionForm.areas);
  const dispatch = useDispatch();

  const formId = useSelector((state: RootState) => state.app.formId);
  useEffect(() => {
    fetchAllLocations(dispatch, defaultLocation);
    fetchAllAreas(dispatch, selectedLocation.id);
    fetchAllIssues(dispatch);
  }, []);
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      emails: [{ value: '' }],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (formId) {
      submitInspectionForm(data, locations, areas, formId, isDraft, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <NameInput />
      <DateInput register={register} />
      <LocationSelectInput register={register} resetField={resetField} />
      <AreaSelectInput register={register} errors={errors} />
      <AddIssueButton />
      <IssuesList list={listOfIssues} />
      <EmailCheckbox register={register} resetField={resetField} />
      <EmailFields register={register} errors={errors} control={control} />
      <DescriptionTextArea register={register} />
      <div className='buttons-container'>
        <button
          className='tertiary-button'
          type='submit'
          onClick={() => dispatch(setIsDraft(true))}
        >
          Save draft
        </button>
        <button type='submit' className='success-button'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InspectionForm;
