import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspections } from '../../api/api';
import { setInspections } from '../../store/slices/InspectionsSlice';
import { Inspection } from '../../types/types';
import FilterDrawer from './FilterDrawer';
import { Pagination, Spin } from 'antd';
import FilterButton from './FilterButton';
import InspectionListItem from './InspectionListItem';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { createNewInspectionForm } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import './InspectionList.css';
import './DetailButton.css';

const InspectionList = () => {
  const dispatch = useDispatch();
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const inspections = useSelector(
    (state: RootState) => state.inspections.inspections,
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchInspections()
      .then((newInspections: Inspection[]) => {
        dispatch(setInspections([...inspections, ...newInspections]));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inspections:', error);
        setLoading(false);
        toast.error('Failed to fetch inspections');
      });
  }, [currentPage, dispatch, inspections]);

  const toggleFilterDrawer = () => {
    setFilterDrawerVisible(!filterDrawerVisible);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNewInspection = () => {
    createNewInspectionForm(dispatch);
    navigate('/new-inspection');
  };

  const handleViewDetails = () => {};

  return (
    <div className='inspection-list-container'>
      <h1 className='title-inspection-list'>Inspection List</h1>
      <div className='filter-button-container'>
        <FilterButton onClick={toggleFilterDrawer} />
      </div>
      <button className='transparent-button' onClick={handleNewInspection}>
        <FontAwesomeIcon icon={faSearch} />
        New Inspection
      </button>
      <button className='transparent-button-icon' onClick={handleNewInspection}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <Spin spinning={loading}>
        <ul className='inspection-list'>
          {inspections.map((inspection: Inspection) => (
            <InspectionListItem
              key={inspection.id}
              inspection={inspection}
              onViewDetails={handleViewDetails}
            />
          ))}
        </ul>
        <Pagination
          current={currentPage}
          total={inspections.length * 10}
          onChange={handlePageChange}
        />
      </Spin>
      <FilterDrawer
        visible={filterDrawerVisible}
        onClose={toggleFilterDrawer}
      />
    </div>
  );
};

export default InspectionList;
