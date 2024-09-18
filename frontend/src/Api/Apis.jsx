import axios from "axios";

const UserApi = axios.create({
  baseURL: "http://localhost:4000",
});

export async function userSignUp(signUpData) {
  try {
    const data = await UserApi.post("/signup", signUpData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function userLogIn(logInData) {
  try {
    const data = await UserApi.post("/login", logInData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
