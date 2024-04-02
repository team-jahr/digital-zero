import { useEffect, useState } from 'react';
import { InspectionDisplay } from '../types/types';
import { fetchInspectionDisplays } from '../api/api';

const InspectionDisplayTest = () => {
  const [inspectionDisplays, setInspectionDisplays] =
    useState<InspectionDisplay[]>();

  useEffect(() => {
    fetchInspectionDisplays()
      .then((res) => setInspectionDisplays(res))
      .catch(() => console.log('Oppsie'));
  }, []);

  console.log('inspectionDisplays: ', inspectionDisplays);

  return (
    <>
      <div>InspectionDisplayTest</div>
    </>
  );
};

export default InspectionDisplayTest;
