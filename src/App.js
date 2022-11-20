import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "./store/configureStore";

function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default App;

// 이파일은 수정 ㄴㄴ 해주세요!