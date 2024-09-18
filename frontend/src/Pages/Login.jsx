import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../Api/Apis";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || emailAlert) {
      setEmailAlert("Must fillout the field.");
    } else if (password.trim() === "" || passAlert) {
      setPassAlert("Must fillout the field.");
    } else {
      const response = await userLogIn({ email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setEmailAlert(response.data.message);
      }
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {emailAlert && (
                  <p style={{ color: "red" }}>
                    <i className="fa-solid fa-triangle-exclamation" />
                    &nbsp;&nbsp;&nbsp;{emailAlert}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passAlert && (
                  <p style={{ color: "red" }}>
                    <i className="fa-solid fa-triangle-exclamation" />
                    &nbsp;&nbsp;&nbsp;{passAlert}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign-Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
