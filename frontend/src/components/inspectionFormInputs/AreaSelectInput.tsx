import { Area, InspectionFormInputs } from '../../types/types.ts';
import { ErrorMessage } from '@hookform/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import {
  setAreaValue,
  setIsAreaDisabled,
} from '../../store/slices/InspectionFormSlice.ts';

type AreaSelectInputProp = {
  register: UseFormRegister<InspectionFormInputs>;
  errors: FieldErrors<InspectionFormInputs>;
  defaultValue: string;
};
const AreaSelectInput = ({
  register,
  errors,
  defaultValue,
}: AreaSelectInputProp) => {
  const areas = useSelector((state: RootState) => state.inspectionForm.areas);
  const dispatch = useDispatch<AppDispatch>();
  const areaDisabled = useSelector(
    (state: RootState) => state.inspectionForm.areaDisabled,
  );
  return (
    <div className='form-field-container mb-5'>
      <label
        className={areaDisabled ? 'form-label disabled' : 'form-label'}
        htmlFor='area'
      >
        Area
      </label>
      <select
        id='area'
        disabled={areaDisabled}
        {...register('area', {
          required: 'Field is required.',
          onChange: (e) => {
            if (e.target.value !== '') dispatch(setIsAreaDisabled(true));
            dispatch(setAreaValue(e.target.value));
          },
        })}
        className={errors?.area ? 'form-select mb-1 error' : 'form-select mb-1'}
      >
        <option value=''>{defaultValue}</option>
        {areas.map((element: Area) => {
          const { name, id } = element;
          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        })}
      </select>
      {areaDisabled && (
        <button
          type='button'
          className='primary-button'
          onClick={() => dispatch(setIsAreaDisabled(false))}
        >
          Edit section
        </button>
      )}
      <ErrorMessage
        errors={errors}
        name='area'
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

export default AreaSelectInput;
