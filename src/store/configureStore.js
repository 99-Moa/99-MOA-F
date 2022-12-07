import { configureStore } from "@reduxjs/toolkit";
import toggleModal from "./modules/parkmade/toggleModal";

const store = configureStore({
  reducer: {
    toggleModal: toggleModal.reducer,
  },
});

export default store;

// 이곳에 연동해주세요
