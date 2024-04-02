import { useSelector } from 'react-redux';
import SingleIssue from './SingleIssue';
import { RootState } from '../store/store';
import { useEffect } from 'react';

const IssuesList = () => {
  const listOfIssues = useSelector(
    (state: RootState) => state.inspectionForm.listOfIssues,
  );

  useEffect(() => {}, [listOfIssues]);
  return (
    <>
      {listOfIssues !== undefined &&
        listOfIssues.map((el) => {
          return <SingleIssue issue={el} key={el.id} />;
        })}
    </>
  );
};

export default IssuesList;
