import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:8000/login", userCredential);
    console.log("response", res)
    dispatch({ type: "LOGIN_SUCCESS", payload: userCredential });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

// user does not exist!Please Signup