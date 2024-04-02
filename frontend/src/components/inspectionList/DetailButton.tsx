import React from 'react';
import './DetailButton.css';

type DetailButtonProps = {
  onClick: () => void;
};

const DetailButton: React.FC<DetailButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className='detail-button'>
      View Details
    </button>
  );
};

export default DetailButton;
