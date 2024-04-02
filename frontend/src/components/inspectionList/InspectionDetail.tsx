import { Inspection } from '../../types/types';
import IssuesList from '../IssuesList';

type InspectionDetailProps = {
  inspection: Inspection;
};

const InspectionDetail = ({ inspection }: InspectionDetailProps) => {
  return (
    <div>
      <h2>Inspection Detail</h2>
      <h3>Date: {inspection.date}</h3>
      <h3>Title: {inspection.title}</h3>
      <h3>Description: {inspection.description}</h3>
      <IssuesList list={inspection.issues} />
    </div>
  );
};

export default InspectionDetail;
