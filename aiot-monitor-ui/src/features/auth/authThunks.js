// export const loginUser = (credentials) => async (dispatch) => {
//   try {
//     dispatch(loginStart());

//     // Giả lập API call
//     // const response = await api.login(credentials);
//     // Thay thế bằng API call thực tế của bạn

//     // Giả lập đăng nhập thành công sau 1 giây
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const userData = {
//       id: 1,
//       username: credentials.username,
//       role: "admin",
//     };

//     dispatch(loginSuccess(userData));
//     return userData;
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//     throw error;
//   }
// };

// export default authSlice.reducer;
