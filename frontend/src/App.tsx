import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { Toaster } from 'react-hot-toast';
import { Button, Drawer } from 'antd';
import { createNewInspectionForm } from './api/api.ts';
import ImageTestComponent from './components/ImageTestComponent.tsx';
import InspectionForm from './components/InspectionForm.tsx';
import IssueForm from './components/IssueForm.tsx';
import { setShowDrawer } from './store/slices/IssueFormSlice.ts';

const App = () => {
  const isDrawerVisible = useSelector(
    (state: RootState) => state.issueForm.isDrawerOpen,
  );
  const onCloseDrawer = () => {
    dispatch(setShowDrawer(false));
  };
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
      <Drawer
        title='Add Issue'
        placement='right'
        closable={true}
        onClose={onCloseDrawer}
        open={isDrawerVisible}
        width={500}
      >
        <IssueForm />
      </Drawer>
      <InspectionForm />
    </>
  );
};

export default App;
