import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { listOfIssues, user } from '../data/data.ts';
import './InspectionFormStyles.css';
import AddIssueButton from './AddIssueButton';
import { Area, Inputs, Issue, Location } from '../types/types.ts';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import IssuesList from './IssuesList.tsx';

const InspectionForm = () => {
  const [location, setLocations] = useState<Location[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    fetchLocations();
    fetchAreas(currentLocation.name);
  }, []);
  const fetchLocations = () => {
    fetch('http://localhost:8080/api/locations')
      .then((res) => res.json())
      .then((res) => {
        setLocations(res);
        return res;
      })
      .then((res) => {
        const otherLocations = res.filter(
          (el: Location) => el.name !== currentLocation.name,
        );
        setOtherLocations(otherLocations);
      })
      .catch((err) => console.log(err));
  };
  const fetchAreas = (location: string) => {
    fetch(`http://localhost:8080/api/areas?location=${location}`)
      .then((res) => res.json())
      .then((res) => {
        setAreas(res);
      });
  };
  const handleAddIssue = () => {
    // Logic to handle adding an issue goes here
  };
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: 1,
    name: 'Stockholm',
  });
  const [sendEmail, setSendEmail] = useState(false);
  const [draft, setDraft] = useState(false);
  const [list, setList] = useState<Issue[]>([]);
  const [otherLocations, setOtherLocations] = useState([]);
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
  useEffect(() => {
    setList([...listOfIssues]);
  }, []);
  const handleSaveDraft: SubmitHandler<Inputs> = (data) => {
    setDraft(true);
    onSubmit(data);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.area);
    console.log(data.location);
    const responseLocation = location.filter(
      (el) => el.name === data.location,
    )[0];
    const responseArea = areas.filter((el) => el.name === data.area)[0];
    const responseEmail = data.email ? data.emails[0].value : null;
    const responseBody = {
      id: 3,
      isDraft: draft,
      date: new Date(data.date).toISOString(),
      location: responseLocation,
      area: responseArea,
      email: responseEmail,
      description: data.description,
    };
    console.log(JSON.stringify(responseBody));
    fetch('http://localhost:8080/api/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responseBody),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
              const selectedLocation = location.filter(
                (element) => element.name === e.target.value,
              );
              resetField('area');
              fetchAreas(selectedLocation[0].name);
              setCurrentLocation(selectedLocation[0]);
            },
          })}
          className='form-select'
        >
          <option value={user.location.name}>{user.location.name}</option>
          {otherLocations.map((element) => {
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
          {areas.map((element: Area) => {
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
      <IssuesList list={list} />

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
        <button className='tertiary-button' onClick={handleSaveDraft}>
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
