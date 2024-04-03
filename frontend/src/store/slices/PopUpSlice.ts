import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopUpState {
  isModalOpen: boolean;
  popUpMessage: string;
  popUpConfirmButton: string;
  popUpCancelButton: string;
}

const initialState: PopUpState = {
  isModalOpen: false,
  popUpMessage: '',
  popUpConfirmButton: '',
  popUpCancelButton: '',
};
const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setPopUpMessage: (state, action: PayloadAction<string>) => {
      state.popUpMessage = action.payload;
    },
    setPopUpConfirmButton: (state, action: PayloadAction<string>) => {
      state.popUpConfirmButton = action.payload;
    },
    setPopUpCancelButton: (state, action: PayloadAction<string>) => {
      state.popUpCancelButton = action.payload;
    },
  },
});

export const {
  setIsModalOpen,
  setPopUpMessage,
  setPopUpConfirmButton,
  setPopUpCancelButton,
} = popUpSlice.actions;
export default popUpSlice.reducer;
