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
      {listOfIssues.length > 0 ? (
        listOfIssues.map((el) => {
          return <SingleIssue issue={el} key={el.id} />;
        })
      ) : (
        <div className='listOfIssues-title'>List of issues is empty</div>
      )}
    </>
  );
};

export default IssuesList;
