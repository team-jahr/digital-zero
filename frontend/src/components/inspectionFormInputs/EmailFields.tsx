import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { Inputs } from '../../types/types.ts';

type EmailFieldsProp = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  control: Control<Inputs>;
};

const EmailFields = ({ register, errors, control }: EmailFieldsProp) => {
  const sendEmail = useSelector(
    (state: RootState) => state.inspectionForm.isSendEmailChecked,
  );
  const { fields, append, remove } = useFieldArray({
    name: 'emails',
    control,
  });
  return (
    sendEmail && (
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
    )
  );
};

export default EmailFields;
