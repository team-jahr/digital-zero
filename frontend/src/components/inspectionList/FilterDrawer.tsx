import { Drawer } from 'antd';
import InspectionListFilter from './InspectionListFilter.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setShowDrawer } from '../../store/slices/IssueFormSlice.ts';

const FilterDrawer = () => {
  const isDrawerVisible = useSelector(
    (state: RootState) => state.issueForm.isDrawerOpen,
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setShowDrawer(false));
  };
  console.log(isDrawerVisible);
  return (
    <Drawer
      title='Filter'
      placement='right'
      onClose={onClose}
      open={isDrawerVisible}
      width={500}
    >
      <InspectionListFilter />
    </Drawer>
  );
};

export default FilterDrawer;
