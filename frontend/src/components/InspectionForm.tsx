import { useForm, SubmitHandler } from 'react-hook-form';
import AddIssueButton from './AddIssueButton';

type Inputs = {
  example: string;
};

const InspectionForm = () => {
  const { handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const handleAddIssue = () => {
    // Logic to handle adding an issue goes here
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* below place date input*/}

      {/*below place location select input*/}

      {/* below place area select input*/}

      {/* below place import for list component*/}

      <AddIssueButton onAddIssue={handleAddIssue} />

      {/* below place send email checkbox*/}

      {/* below place enter email/emails input/inputs*/}

      {/* below place buttons save draft and submit*/}

      <input type='submit' />
    </form>
  );
};

export default InspectionForm;
