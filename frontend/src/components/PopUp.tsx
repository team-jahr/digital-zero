import {Button, Modal} from "antd";
import {Dispatch, SetStateAction} from "react";
import {DeleteOutlined} from "@ant-design/icons";

type PopUpProps = {
  open: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}
const PopUp = ({open, setModalOpen}: PopUpProps) => {

  const handleOk = () => {
    setModalOpen(false);
  }
  const handleCancel = () => {
    setModalOpen(false);
  }

  return (
    <Modal footer={null}
           open={open}
           onCancel={handleCancel}>
      <div>Are you sure you want to delete this issue?</div>
      <div>
        <Button type="default" onClick={handleCancel}>Cancel</Button>
        <Button danger onClick={handleOk}>Delete</Button>
      </div>
    </Modal>
  );
};

export default PopUp;