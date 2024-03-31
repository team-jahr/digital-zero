import { Issue } from '../types/types';
import SingleIssue from './SingleIssue';

type ListOfIssuesProp = {
  list: Issue[];
};

const IssuesList = ({ list }: ListOfIssuesProp) => {
  return (
    <>
      {list.map((el) => {
        return <SingleIssue data={el} key={el.id} />;
      })}
    </>
  );
};

export default IssuesList;
