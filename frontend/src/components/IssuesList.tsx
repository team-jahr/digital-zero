import SingleIssue from './SingleIssue.tsx';
import { Issue } from '../types/types.ts';

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
