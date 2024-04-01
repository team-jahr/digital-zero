import { useSelector } from 'react-redux';
import SingleIssue from './SingleIssue';
import { RootState } from '../store/store';

const IssuesList = () => {
  const issues = useSelector(
    (state: RootState) => state.inspectionForm.listOfIssues,
  );

  return (
    <>
      {issues.map((el) => {
        return <SingleIssue issue={el} key={el.id} />;
      })}
    </>
  );
};

export default IssuesList;
