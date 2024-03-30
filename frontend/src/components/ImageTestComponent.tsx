import { useEffect, useState } from 'react';

// type IssueImages = {
//   issueId: string;
//   images: string[];
// };
type IssueImage = {
  image: string;
};

const ImageTestComponent = () => {
  const [image, setImage] = useState<string>('');
  // const [test, setTest] = useState();
  useEffect(() => {
    fetch('http://localhost:8080/api/issues')
      .then((res) => res.json())
      .then((data) => setImage(data.dtos[0].imgRef));
  }, []);

  // useEffect(() => {
  //   setTest(img);
  // }, [image]);

  return (
    <div>
      <img src={`data:image/png;base64,${image}`} />
    </div>
  );
};

export default ImageTestComponent;
