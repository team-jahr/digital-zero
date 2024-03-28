import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { allMockedAppLocations, user } from '../data/data.ts';
import './InspectionFormStyles.css';
import AddIssueButton from './AddIssueButton';
import { AppLocation, Area, Inputs } from '../types/types.ts';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { setAppLocation } from '../store/location/locationSlice.ts';
import { fetchLocations } from '../utils/globalFunctions.ts';

const InspectionForm = () => {
  const handleAddIssue = () => {
    // Logic to handle adding an issue goes here
  };
  // const [currentLocation, setCurrentLocation] = useState(user.location);
  const appLocation = useSelector(
    (state: RootState) => state.setAppLocation.value
  );
  const dispatchAppLocation = useDispatch<AppDispatch>();

  const [sendEmail, setSendEmail] = useState(false);
  // const [otherLocations] = useState(
  //   location.filter((el) => el.name !== appLocation.name)
  // );

  const [otherLocations, setOtherLocations] = useState<AppLocation[]>();

  useEffect(() => {
    fetchLocations('kindly work').then((res) =>
      setOtherLocations(
        res.filter((location) => location.id !== appLocation.id)
      )
    );
  }, [appLocation]);

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

  const { fields, append, remove } = useFieldArray({
    name: 'emails',
    control,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div className='form-field-container'>
        <label className='form-label name-label' htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          id='name'
          defaultValue={user.name}
          readOnly
          className='form-input'
        />
      </div>

      <div className='form-field-container'>
        <label className='form-label' htmlFor='date'>
          Date
        </label>
        <input
          type='date'
          id='date'
          className='form-input'
          {...register('date', { valueAsDate: true })}
          defaultValue={new Date().toISOString().substring(0, 10)}
        />
      </div>

      <div className='form-field-container'>
        <label className='form-label' htmlFor='location'>
          Location
        </label>
        <select
          id='location'
          {...register('location', {
            onChange: (e) => {
              const selectedLocation = allMockedAppLocations.filter(
                (element) => element.name === e.target.value
              );
              resetField('area');
              dispatchAppLocation(setAppLocation(selectedLocation[0]));
              // setCurrentLocation(selectedLocation[0]);
            },
          })}
          className='form-select'
        >
          <option value={user.location.name}>{user.location.name}</option>
          {otherLocations !== undefined &&
            otherLocations.map((element) => {
              const { name, id } = element;
              return (
                <option value={name} key={id}>
                  {name}
                </option>
              );
            })}
        </select>
      </div>

      <div className='form-field-container mb-5'>
        <label className='form-label' htmlFor='area'>
          Area
        </label>
        <select
          id='area'
          {...register('area', { required: 'Field is required.' })}
          className={
            errors?.area ? 'form-select mb-1 error' : 'form-select mb-1'
          }
        >
          <option value=''>Select area</option>
          {appLocation.area.map((element: Area) => {
            const { name, id } = element;
            return (
              <option value={name} key={id}>
                {name}
              </option>
            );
          })}
        </select>
        <ErrorMessage
          errors={errors}
          name='area'
          render={({ message }) => <p>{message}</p>}
        />
      </div>

      <AddIssueButton onAddIssue={handleAddIssue} />

      <label className='email-label'>
        <input
          type='checkbox'
          placeholder='email'
          {...register('email', {
            onChange: () => {
              resetField('emails');
              setSendEmail(!sendEmail);
            },
          })}
        />
        Send email
      </label>

      {sendEmail && (
        <div className='form-field-container mb-10'>
          <label className='emails-label'>Enter email(s):</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className='mb-3'>
                <div className='form-email-field'>
                  <input
                    {...register(`emails.${index}.value` as const, {
                      required: 'Field is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message:
                          "Please enter a valid email address. It should contain an '@' symbol and valid domain extension such as .com or .net.",
                      },
                    })}
                    className={
                      errors?.emails?.[index]?.value
                        ? 'form-input mb-0 error'
                        : 'form-input mb-0'
                    }
                  />
                  {fields.length > 1 && (
                    <Button
                      type='default'
                      shape='circle'
                      icon={<DeleteOutlined />}
                      onClick={() => remove(index)}
                    />
                  )}
                </div>
                <ErrorMessage
                  errors={errors}
                  name={`emails.${index}.value` as const}
                  render={({ message }) => <p>{message}</p>}
                />
              </div>
            );
          })}
          <Button
            type='primary'
            className='primary-button'
            onClick={() =>
              append({
                value: '',
              })
            }
          >
            Add another email
          </Button>
        </div>
      )}
      <div className='form-field-container'>
        <label className='form-label'>Additional notes</label>
        <textarea {...register('description')} className='form-textarea' />
      </div>
      <div className='buttons-container'>
        <button className='tertiary-button'>Save draft</button>
        <button type='submit' className='success-button'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InspectionForm;
