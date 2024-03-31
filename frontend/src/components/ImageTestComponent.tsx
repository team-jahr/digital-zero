import { useEffect, useState } from 'react';

type Issue = {
  title: string;
  description: string;
  severity: string;
  imgRef: string[];
};

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
          issue.imgRef.map((imgData) => {
            return <img src={`data:image/png;base64,${imgData}`} />;
          }),
        )}
    </div>
  );
};

export default ImageTestComponent;
