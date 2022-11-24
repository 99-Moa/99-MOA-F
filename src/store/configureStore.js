import { configureStore } from "@reduxjs/toolkit";
import getIds from "./modules/parkmade/getIds";
import modalState from "./modules/yoonmade/modalState";
import planId from "./modules/parkmade/planId";

const store = configureStore({
  reducer: {
    getIds: getIds.reducer,
    modalState: modalState.reducer,
    planId:planId.reducer,
  },
});

export default store;

// 이곳에 연동해주세요
