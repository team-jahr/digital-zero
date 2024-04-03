import { Drawer, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setIsSubmitted,
  setSelectedInspector,
} from '../../store/slices/FilterSlice';

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const isSubmitted = useSelector(
    (state: RootState) => state.filter.isSubmitted,
  );
  const selectedInspector = useSelector(
    (state: RootState) => state.filter.selectedInspector,
  );

  const handleIsSubmittedChange = (value: boolean) => {
    dispatch(setIsSubmitted(value));
  };

  const handleInspectorChange = (value: string | null) => {
    dispatch(setSelectedInspector(value));
  };

  return (
    <Drawer
      title='Filter'
      placement='right'
      onClose={onClose}
      open={visible}
      width={500}
    >
      <div>
        <h3>Filter by Is Submitted</h3>
        {/* Add component to select isSubmitted */}
        <Select value={isSubmitted} onChange={handleIsSubmittedChange}>
          <Select.Option value={true}>Submitted</Select.Option>
          <Select.Option value={false}>Not Submitted</Select.Option>
        </Select>

        <h3>Filter by Inspector</h3>
        {/* Add component to select inspector */}
        <Select value={selectedInspector} onChange={handleInspectorChange}>
          {/* Add options based on available inspectors */}
        </Select>

        <h3>Filter by Date</h3>
        {/* Add component to select date */}
        <DatePicker />

        <h3>Filter by Location</h3>
        <Select>{/* Add options based on available locations */}</Select>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
