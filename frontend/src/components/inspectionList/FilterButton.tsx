import React from 'react';
import './FilterButton.css';

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button type='button' onClick={onClick} className='primary-button'>
      Filter
    </button>
  );
};

export default FilterButton;
