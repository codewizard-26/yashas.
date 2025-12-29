import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginSuccess({ name: "Yashwant" }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Login Page</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </div>
  );
}