import { Modal } from 'antd';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import './PopUpStyles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

type PopUpProps = {
  open: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOk: MouseEventHandler<HTMLButtonElement>;
};
const PopUp = ({ open, setModalOpen, handleOk }: PopUpProps) => {
  const handleCancel = () => {
    setModalOpen(false);
  };
  const message = useSelector((state: RootState) => state.popUp.popUpMessage);
  const buttonConfirm = useSelector(
    (state: RootState) => state.popUp.popUpConfirmButton,
  );
  const buttonCancel = useSelector(
    (state: RootState) => state.popUp.popUpCancelButton,
  );

  return (
    <Modal footer={null} open={open} onCancel={handleCancel}>
      <div className='modal-title'>{message}</div>
      <div className='modal-buttons-container'>
        <button className='success-button' type='button' onClick={handleOk}>
          {buttonConfirm}
        </button>
        <button className='danger-button' type='button' onClick={handleCancel}>
          {buttonCancel}
        </button>
      </div>
    </Modal>
  );
};

export default PopUp;
