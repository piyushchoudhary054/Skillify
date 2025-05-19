import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#0284c7]">Skillify</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/challenges"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-[#64748b] hover:text-[#334155] hover:border-[#cbd5e1]"
              >
                Challenges
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-[#64748b] hover:text-[#334155] hover:border-[#cbd5e1]"
              >
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#334155]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#334155]"
                >
                  {user.username}
                </Link>
                <button
                  onClick={logout}
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-white bg-[#0ea5e9] hover:bg-[#0369a1]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-[#64748b] hover:text-[#334155]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-white bg-[#0284c7] hover:bg-[#0369a1]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
