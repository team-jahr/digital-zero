import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import {
  setEnlargedImage,
  setPictures,
} from '../../store/slices/IssueFormSlice.ts';
import { useRef } from 'react';

const PictureUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pictures = useSelector((state: RootState) => state.issueForm.pictures);

  const dispatch = useDispatch<AppDispatch>();
  const handlePictureClick = (pictureUrl: string) => {
    dispatch(setEnlargedImage(pictureUrl));
  };

  const handleDeletePicture = (index: number) => {
    if (pictures) {
      dispatch(setPictures([...pictures].filter((_, i) => i !== index)));
    }
  };
  const handlePictureAdded = (imageDataUrl: string) => {
    if (pictures) {
      dispatch(setPictures([...pictures, imageDataUrl]));
    }
  };
  return (
    <div className='grid grid-cols-2 gap-4 mb-4'>
      {pictures &&
        pictures.length > 0 &&
        pictures.map((picture, index) => (
          <div className='col-span-1 flex flex-col items-center' key={index}>
            <button
              className='delete-picture-button self-end'
              type='button'
              onClick={() => handleDeletePicture(index)}
            >
              &#10005;
            </button>
            <div key={index} onClick={() => handlePictureClick(picture)}>
              <img
                src={picture}
                alt='Uploaded'
                className='max-h-28 max-w-full'
              />
            </div>
            {/* Hidden file input field */}
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) =>
                e.target.files !== null &&
                handlePictureAdded(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
        ))}
    </div>
  );
};

export default PictureUpload;
