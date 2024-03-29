import { Issue } from '../types/types';
import SingleIssue from './SingleIssue';

type ListOfIssuesProp = {
  list: Issue[];
};

const IssuesList = ({ list }: ListOfIssuesProp) => {
  return (
    <div>
      {list.map((el) => {
        return <SingleIssue data={el} key={el.id} />;
      })}
    </div>
  );
};

export default IssuesList;
