export const loginValidation = (
  isLogin?: boolean,
  name?: any,
  email?: any,
  password?: any
) => {
  let emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!isLogin && name.length === 0) {
    return "Username is required.";
  } else if (email.length === 0) {
    return "Email id is required.";
  } else if (password.length === 0) {
    return "Passowrd is required.";
  } else if (!emailRegx.test(email)) {
    return "Valid email address is required.";
  } else if (!passwordRegx.test(password)) {
    return "Valid password is required.";
  }
  return false;
};
