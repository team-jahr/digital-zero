import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { Toaster } from 'react-hot-toast';
import { Button } from 'antd';
import { createNewInspectionForm } from './api/api.ts';
import ImageTestComponent from './components/ImageTestComponent.tsx';
import InspectionForm from './components/InspectionForm.tsx';

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
      <ImageTestComponent />
      <Button type='default' onClick={handleNewInspection}>
        New Inspection
      </Button>
      {showInspectionForm && <InspectionForm />}
      <InspectionForm />
    </>
  );
};

export default App;
