import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { IssueFormInputs } from '../../types/types.ts';

type IssueDescriptionInput = {
  register: UseFormRegister<IssueFormInputs>;
  errors: FieldErrors<IssueFormInputs>;
};
const IssueDescriptionInput = ({ register, errors }: IssueDescriptionInput) => {
  const [descriptionLength, setDescriptionLength] = useState(500);
  const handleAmountOfChars = (e: KeyboardEvent) => {
    if (descriptionLength < 0) {
      if (!(e.key === 'Backspace' || e.key === 'Enter' || e.key === 'Delete')) {
        e.preventDefault();
        setDescriptionLength(0);
      }
    }
  };
  return (
    <div className='form-field-container'>
      <label className='form-label'>Description</label>
      <textarea
        id='description'
        onKeyDown={() => handleAmountOfChars}
        {...register('description', {
          required: {
            value: true,
            message: 'Description cannot be empty.',
          },
          maxLength: {
            value: 500,
            message: 'Maximum amount of characters has been reached.',
          },
          onChange: (e) => {
            const countCharacters = e.target.value;
            const calculateRemainingChars = 500 - countCharacters.length;
            if (calculateRemainingChars > 0) {
              setDescriptionLength(() => calculateRemainingChars);
            } else {
              e.target.value = e.target.value.substring(0, 500);
            }
          },
        })}
        className={
          errors?.description
            ? 'form-textarea mb-0 error'
            : 'form-textarea mb-0'
        }
      />
      <ErrorMessage
        errors={errors}
        name={'description'}
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

export default IssueDescriptionInput;
