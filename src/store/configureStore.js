import { configureStore } from "@reduxjs/toolkit";
import modalState from "./modules/yoonmade/modalState";
import toggleModal from "./modules/parkmade/toggleModal";

const store = configureStore({
  reducer: {
    modalState: modalState.reducer,
    toggleModal: toggleModal.reducer,
  },
});

export default store;

// 이곳에 연동해주세요
