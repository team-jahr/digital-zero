import InspectionListFilter from './InspectionListFilter.tsx';
import FilterButton from './FilterButton.tsx';
import FilterDrawer from './FilterDrawer.tsx';
import { setShowDrawer } from '../../store/slices/IssueFormSlice.ts';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

const FilterContainer = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 720px)' });
  const toggleFilterDrawer = () => {
    dispatch(setShowDrawer(true));
  };
  const dispatch = useDispatch();
  return (
    <div>
      {isTabletOrMobile ? (
        <>
          <FilterButton onClick={toggleFilterDrawer} />
          <FilterDrawer />{' '}
        </>
      ) : (
        <InspectionListFilter />
      )}
    </div>
  );
};

export default FilterContainer;
