import { UseFormRegister } from 'react-hook-form';
import { Inputs } from '../../types/types.ts';

type DescriptionTextAreaProp = {
  register: UseFormRegister<Inputs>;
};
const DescriptionTextArea = ({ register }: DescriptionTextAreaProp) => {
  return (
    <div className='form-field-container'>
      <label className='form-label'>Additional notes</label>
      <textarea {...register('description')} className='form-textarea' />
    </div>
  );
};

export default DescriptionTextArea;
