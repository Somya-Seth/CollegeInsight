import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:8000/login", userCredential);
    console.log("response", res)
    dispatch({ type: "LOGIN_SUCCESS", payload: userCredential });
  } catch (err) {
    console.log("payload error", err.response.data.message);
    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
    return err.response.data.message
  }
};

// user does not exist!Please Signup