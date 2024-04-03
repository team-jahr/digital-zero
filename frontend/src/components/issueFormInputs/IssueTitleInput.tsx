import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IssueFormInputs } from '../../types/types.ts';
import { ErrorMessage } from '@hookform/error-message';

type IssueTitleInputProps = {
  register: UseFormRegister<IssueFormInputs>;
  errors: FieldErrors<IssueFormInputs>;
};
const IssueTitleInput = ({ register, errors }: IssueTitleInputProps) => {
  return (
    <div className='form-field-container'>
      <label htmlFor='title' className='form-label'>
        Title
      </label>
      <input
        id='title'
        type='text'
        {...register('title', {
          required: {
            value: true,
            message: 'Field is required. Please enter title.',
          },
        })}
        className={errors?.title ? 'form-input mb-0 error' : 'form-input mb-0'}
      />
      <ErrorMessage
        errors={errors}
        name={'title'}
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

export default IssueTitleInput;
