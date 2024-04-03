import { setEnlargedImage } from '../../store/slices/IssueFormSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';

const PictureEnlarge = () => {
  const enlargedImage = useSelector(
    (state: RootState) => state.issueForm.enlargedImage,
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleCloseEnlargedImage = () => {
    dispatch(setEnlargedImage(null));
  };
  return (
    <div
      className='enlarged-image-overlay'
      style={{ display: enlargedImage ? 'block' : 'none' }}
      onClick={handleCloseEnlargedImage}
    >
      <div className='enlarged-image-container flex flex-col items-center'>
        <button
          className='close-enlarged-image-button self-end'
          onClick={handleCloseEnlargedImage}
        >
          &#10005;
        </button>
        {enlargedImage && (
          <img src={enlargedImage} alt='Enlarged' className='enlarged-image' />
        )}
      </div>
    </div>
  );
};

export default PictureEnlarge;
