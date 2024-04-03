import { UseFormRegister } from 'react-hook-form';
import { IssueFormInputs } from '../../types/types.ts';

type IssueSeverityLevelInputProp = {
  register: UseFormRegister<IssueFormInputs>;
};
const IssueSeverityLevelInput = ({ register }: IssueSeverityLevelInputProp) => {
  return (
    <div className='form-field-container'>
      <label htmlFor='severity' className='form-label'>
        Severity Level
      </label>
      <select id='severity' {...register('severity')} className='form-select'>
        <option value='notification'>Notification</option>
        <option value='warning'>Warning</option>
        <option value='critical'>Critical</option>
        <option value='alert'>Alert</option>
        <option value='emergency'>Emergency</option>
      </select>
    </div>
  );
};

export default IssueSeverityLevelInput;
