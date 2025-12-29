import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span>Hello, {user.name}</span>
          <button
            onClick={() => dispatch(logout())}
            className="px-3 py-1 bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}