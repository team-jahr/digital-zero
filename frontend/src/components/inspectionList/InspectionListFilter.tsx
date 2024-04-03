import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLocations } from '../../api/api.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FilterInspectionsFormInputs } from '../../types/types.ts';
import { RootState } from '../../store/store.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setInspectionDisplays } from '../../store/slices/InspectionDisplaysSlice.ts';
import './InspectionListFilterStyles.css';

const InspectionListFilter = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FilterInspectionsFormInputs>({});
  const onSubmit: SubmitHandler<FilterInspectionsFormInputs> = (data) => {
    console.log(!isNaN(+data.date));
    getInspectionsFilteredByLocation(data);
  };
  const locations = useSelector(
    (state: RootState) => state.inspectionForm.allLocations,
  );
  useEffect(() => {
    fetchAllLocations(dispatch);
  }, []);

  const dispatch = useDispatch();
  const getInspectionsFilteredByLocation = (
    data: FilterInspectionsFormInputs,
  ) => {
    let url = `submitted=${data.submitted}`;
    if (data.location != 0) {
      url += `&location=${data.location}`;
    } else if (!isNaN(+data.date)) {
      const date = new Date(data.date).toISOString();
      console.log(date);
      url += `&date=${date}`;
    }

    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/inspections/filterBy?${url}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch(setInspectionDisplays(res.inspectionDTOs));
        navigate(`/filtered/${url}`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='form filter-form'>
        <div className='form-field-container'>
          <label className='form-label' htmlFor='date'>
            Location
          </label>
          <select
            id='location'
            {...register('location')}
            className='form-select'
          >
            <option value={0}>Select location</option>
            {locations.map((element) => {
              const { name, id } = element;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-field-container'>
          <label className='form-label' htmlFor='date'>
            Date
          </label>
          <input
            type='date'
            id='date'
            className='form-input'
            {...register('date', {
              valueAsDate: true,
            })}
          />
        </div>
        <div className='form-field-container'>
          <label className='form-label' htmlFor='date'>
            Submitted
          </label>
          <select
            id='location'
            {...register('submitted')}
            className='form-select'
          >
            <option defaultValue='false'>No</option>
            <option value='true'>Yes</option>
          </select>
        </div>
        <button className='primary-button' type='submit'>
          Filter
        </button>
      </form>
    </div>
  );
};

export default InspectionListFilter;
