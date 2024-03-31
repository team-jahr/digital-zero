import { Area, Inputs } from '../../types/types.ts';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type AreaSelectInputProp = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
};
const AreaSelectInput = ({ register, errors }: AreaSelectInputProp) => {
  const areas = useSelector((state: RootState) => state.inspectionForm.areas);
  return (
    <div className='form-field-container mb-5'>
      <label className='form-label' htmlFor='area'>
        Area
      </label>
      <select
        id='area'
        {...register('area', { required: 'Field is required.' })}
        className={errors?.area ? 'form-select mb-1 error' : 'form-select mb-1'}
      >
        <option value=''>Select area</option>
        {areas.map((element: Area) => {
          const { name, id } = element;
          return (
            <option value={id} key={id}>
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
  );
};

export default AreaSelectInput;
