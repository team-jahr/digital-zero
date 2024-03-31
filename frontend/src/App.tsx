import InspectionForm from './components/InspectionForm.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { Toaster } from 'react-hot-toast';
import { Button } from 'antd';
import { createNewInspectionForm } from './api/api.ts';

const App = () => {
  const showInspectionForm = useSelector(
    (state: RootState) => state.app.showInspectionForm,
  );
  const dispatch = useDispatch();
  const handleNewInspection = () => {
    createNewInspectionForm(dispatch);
  };
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Button type='default' onClick={handleNewInspection}>
        New Inspection
      </Button>
      {showInspectionForm && <InspectionForm />}
    </>
  );
};

export default App;
