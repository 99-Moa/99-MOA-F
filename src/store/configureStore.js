import { configureStore } from "@reduxjs/toolkit";
import getIds from "./modules/parkmade/getIds";

const store = configureStore({
	reducer: {
		getIds:getIds.reducer,
	}
});

export default store;

// 이곳에 연동해주세요