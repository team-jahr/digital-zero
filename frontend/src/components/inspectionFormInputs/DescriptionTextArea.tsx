import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Inputs } from '../../types/types.ts';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';

type DescriptionTextAreaProp = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
};
const DescriptionTextArea = ({ register, errors }: DescriptionTextAreaProp) => {
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
      <label className='form-label'>Additional notes</label>
      <textarea
        onKeyDown={() => handleAmountOfChars}
        {...register('description', {
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
        className='form-textarea'
      />
      <ErrorMessage
        errors={errors}
        name={'description'}
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

export default DescriptionTextArea;
