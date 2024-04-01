import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store.ts';
import { Toaster } from 'react-hot-toast';
import { Drawer } from 'antd';
import InspectionForm from './components/InspectionForm.tsx';
import IssueForm from './components/IssueForm.tsx';
import { setShowDrawer } from './store/slices/IssueFormSlice.ts';

const MainApp = () => {
  const isDrawerVisible = useSelector(
    (state: RootState) => state.issueForm.isDrawerOpen,
  );

  const dispatch = useDispatch();

  const onCloseDrawer = () => {
    dispatch(setShowDrawer(false));
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <InspectionForm />
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
    </>
  );
};

export default MainApp;
