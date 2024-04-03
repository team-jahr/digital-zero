import React from 'react';
import './FilterButton.css';

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button type='button' onClick={onClick} className='filter-button'>
      Filter
    </button>
  );
};

export default FilterButton;
