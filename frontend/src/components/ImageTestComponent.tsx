import { useEffect, useState } from 'react';
import { Issue } from '../types/types';

type IssuesDTO = {
  issues: Issue[];
};

const ImageTestComponent = () => {
  const [issueDTOs, setIssueDTOs] = useState<IssuesDTO>();

  useEffect(() => {
    fetch('http://localhost:8080/api/issues')
      .then((res) => res.json())
      .then((data) => setIssueDTOs(data));
  }, []);

  return (
    <div>
      {issueDTOs !== undefined &&
        issueDTOs.issues.map((issue) =>
          issue.images.map((imgData, counter) => {
            return (
              <img key={counter} src={`data:image/png;base64,${imgData}`} />
            );
          }),
        )}
    </div>
  );
};

export default ImageTestComponent;
