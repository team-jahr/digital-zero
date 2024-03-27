import React, { useRef } from 'react';
import './IssueForm.css';

const AddPictureButton = ({ onPicturesAdded }) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newPictures = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;
          newPictures.push(imageDataUrl); // Append the new picture to the list
          if (i === files.length - 1) {
            // If it's the last file, trigger the callback with all new pictures
            onPicturesAdded(newPictures);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCameraButtonClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      const blob = await imageCapture.takePhoto();
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        onPicturesAdded([imageDataUrl]); // Add the new picture to the list
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      <button
        className='add-picture-button'
        onClick={() => fileInputRef.current.click()}
      >
        Upload Picture
      </button>
      {/(android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
        navigator.userAgent
      ) && (
        <button
          className='add-picture-button'
          onClick={handleCameraButtonClick}
        >
          Take Picture
        </button>
      )}
    </div>
  );
};

export default AddPictureButton;
