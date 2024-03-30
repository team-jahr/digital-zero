import InspectionForm from './components/InspectionForm.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { setShowInspectionForm } from './store/AppSlice.ts';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'antd';
import { useState } from 'react';

const App = () => {
  const [formId, setFormId] = useState<number>();
  const showInspectionForm = useSelector(
    (state: RootState) => state.app.showInspectionForm,
  );
  const dispatch = useDispatch();
  const handleNewInspection = () => {
    fetch(`http://localhost:8080/api/inspections/new-inspection`, {
      method: 'POST',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status > 400) {
          return new Error('We have a problem');
        }
      })
      .then((res) => {
        setFormId(res.id);
        toast.success('Successfully created new inspection!');
        dispatch(setShowInspectionForm(true));
      })
      .catch((err) => toast.error(err));
  };
  console.log(formId);
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Button type='default' onClick={handleNewInspection}>
        New Inspection
      </Button>
      {showInspectionForm && <InspectionForm id={formId} />}
    </>
  );
};

export default App;
