import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInspectionDisplays } from '../../api/api';
import { InspectionDisplay } from '../../types/types';
import { Spin } from 'antd';
import InspectionListItem from './InspectionListItem';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { createNewInspectionForm } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import './InspectionList.css';
import './DetailButton.css';
import { setInspectionDisplays } from '../../store/slices/InspectionDisplaysSlice';
import FilterContainer from './FilterContainer.tsx';

const InspectionList = () => {
  const dispatch = useDispatch();
  const inspections = useSelector(
    (state: RootState) => state.inspectionDisplays.inspectionsDisplays,
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [showInspections, setShowInspections] = useState<InspectionDisplay[]>();

  useEffect(() => {
    setLoading(true);

    getInspectionDisplays()
      .then((data) => data.sort((a, b) => b.date.localeCompare(a.date)))
      .then((data) => dispatch(setInspectionDisplays(data)))
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        toast.error('Failed to fetch inspections');
      });
  }, [dispatch]);

  useEffect(() => {
    if (showAll) {
      setShowInspections([...inspections]);
    } else {
      setShowInspections(inspections.slice(0, 5));
    }
  }, [inspections, showAll]);

  const handleNewInspection = () => {
    createNewInspectionForm(dispatch, navigate);
  };

  const handleViewDetails = () => {};

  return (
    <div className='flex justify-center'>
      <div className='mx-2 max-w-5xl w-full grid grid-cols-12'>
        <div className='col-span-full sm:col-start-2 sm:col-span-10'>
          <h1 className='title-inspection-list'>Inspection List</h1>
          <div className='filter-button-container'>
            <FilterContainer />
          </div>
          <button className='transparent-button' onClick={handleNewInspection}>
            <FontAwesomeIcon icon={faSearch} />
            New Inspection
          </button>
          <button
            className='transparent-button-icon'
            onClick={handleNewInspection}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <Spin spinning={loading}>
            <div className=''>
              <ul
                className={
                  showInspections && showInspections.length > 0
                    ? 'inspection-list'
                    : 'inspection-list no-grid'
                }
              >
                {showInspections !== undefined &&
                  showInspections.map((inspection: InspectionDisplay) => (
                    <InspectionListItem
                      key={inspection.id}
                      inspection={inspection}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                {showInspections !== undefined &&
                  showInspections.length == 0 && (
                    <div className='main-title spread'>No items found.</div>
                  )}
              </ul>
              <button
                className='primary-button'
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show less' : 'Show more'}
              </button>
            </div>
            {/* <Pagination
          current={currentPage}
          total={inspections.length * 10}
          onChange={handlePageChange}
        /> */}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default InspectionList;
