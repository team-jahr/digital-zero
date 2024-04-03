import { UseFormRegister, UseFormResetField } from 'react-hook-form';
import { InspectionFormInputs } from '../../types/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setSendEmail } from '../../store/slices/InspectionFormSlice.ts';

type EmailCheckboxProp = {
  register: UseFormRegister<InspectionFormInputs>;
  resetField: UseFormResetField<InspectionFormInputs>;
};

const EmailCheckbox = ({ register, resetField }: EmailCheckboxProp) => {
  const sendEmail = useSelector(
    (state: RootState) => state.inspectionForm.isSendEmailChecked,
  );
  const dispatch = useDispatch();
  return (
    <label className='email-label'>
      <input
        type='checkbox'
        placeholder='email'
        {...register('email', {
          onChange: () => {
            resetField('emails');
            dispatch(setSendEmail(!sendEmail));
          },
        })}
      />
      Send email
    </label>
  );
};

export default EmailCheckbox;
