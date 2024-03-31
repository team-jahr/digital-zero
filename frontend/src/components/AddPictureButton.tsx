import { useRef } from 'react';
import './IssueForm.css';

type AddPictureButtonProp = {
  onPicturesAdded: (p1: string[]) => void;
};

const AddPictureButton = ({ onPicturesAdded }: AddPictureButtonProp) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const files = event.target.files;
    if (!!files && files.length > 0) {
      const newPictures: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target !== null) {
            let imageDataUrl = e.target.result;
            if (imageDataUrl instanceof ArrayBuffer) {
              const decoder = new TextDecoder();
              imageDataUrl = decoder.decode(imageDataUrl);
            }
            if (imageDataUrl !== null) {
              console.log(imageDataUrl);
              newPictures.push(imageDataUrl);
            }
          }
          if (i === files.length - 1) {
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
        if (e.target !== null) {
          let imageDataUrl = e.target.result;
          if (imageDataUrl instanceof ArrayBuffer) {
            const decoder = new TextDecoder();
            imageDataUrl = decoder.decode(imageDataUrl);
          }
          if (imageDataUrl !== null) {
            onPicturesAdded([imageDataUrl]);
          }
        }
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
        type='button'
        onClick={() => {
          !!fileInputRef.current && fileInputRef.current.click();
        }}
      >
        Upload Picture
      </button>
      {/(android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(
        navigator.userAgent,
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
