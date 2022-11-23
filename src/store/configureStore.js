import { configureStore } from "@reduxjs/toolkit";
import getIds from "./modules/parkmade/getIds";
import modalState from "./modules/yoonmade/modalState";

const store = configureStore({
  reducer: {
    getIds: getIds.reducer,
    modalState: modalState.reducer,
  },
});

export default store;

// 이곳에 연동해주세요
