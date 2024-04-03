import { UseFormRegister } from 'react-hook-form';
import { InspectionFormInputs } from '../../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setIsAreaDisabled } from '../../store/slices/InspectionFormSlice.ts';

type DateInputProp = {
  dateDefault: string | undefined;
  register: UseFormRegister<InspectionFormInputs>;
};

const DateInput = ({ dateDefault, register }: DateInputProp) => {
  const areaDisabled = useSelector(
    (state: RootState) => state.inspectionForm.areaDisabled,
  );
  const areaValue = useSelector(
    (state: RootState) => state.inspectionForm.areaValue,
  );
  const dispatch = useDispatch();

  return (
    <div className='form-field-container'>
      <label
        className={areaDisabled ? 'form-label disabled' : 'form-label'}
        htmlFor='date'
      >
        Date
      </label>
      <input
        type='date'
        id='date'
        disabled={areaDisabled}
        className='form-input'
        {...register('date', {
          valueAsDate: true,
          onChange: () => {
            if (areaValue !== '') {
              dispatch(setIsAreaDisabled(true));
            }
          },
        })}
        defaultValue={dateDefault}
      />
    </div>
  );
};

export default DateInput;
