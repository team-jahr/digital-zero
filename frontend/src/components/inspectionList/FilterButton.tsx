import './FilterButton.css';

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <button type='button' onClick={onClick} className='primary-button'>
      Open filter
    </button>
  );
};

export default FilterButton;
