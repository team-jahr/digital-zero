import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
  example: string
}

const IssueForm = () => {
  const {
    handleSubmit,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*below place for title input*/}

      {/*below place for security level select input range f.e. 1-3 */}



      {/* below place for description textarea*/}




      {/* below place for adding picture logic*/}






      {/*below place for add issue button*/}

      <input type="submit"/>
    </form>
  );
};

export default IssueForm;