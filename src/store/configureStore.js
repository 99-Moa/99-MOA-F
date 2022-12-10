import { configureStore } from "@reduxjs/toolkit";
import alertText from "./modules/parkmade/alertText";
import toggleModal from "./modules/parkmade/toggleModal";

const store = configureStore({
  reducer: {
    toggleModal: toggleModal.reducer,
    alertText: alertText.reducer,
  },
});

export default store;

// 이곳에 연동해주세요
