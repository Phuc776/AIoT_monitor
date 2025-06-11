// 3. Cập nhật file App.js
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={AppRoutes} />
    </ReduxProvider>
  );
}

export default App;

//import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/api/hello") // Port backend mặc định
//       .then((response) => response.text())
//       .then((data) => setMessage(data))
//       .catch((error) => console.error("Lỗi gọi API:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Test API Spring Boot</h1>
//       <p>Kết quả từ API: {message}</p>
//     </div>
//   );
// }

// export default App;
