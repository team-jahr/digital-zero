import { UseFormRegister } from 'react-hook-form';
import { InspectionFormInputs } from '../../types/types.ts';

type DateInputProp = {
  register: UseFormRegister<InspectionFormInputs>;
};

const DateInput = ({ register }: DateInputProp) => {
  return (
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
  );
};

export default DateInput;
