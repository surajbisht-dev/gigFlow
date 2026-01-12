import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-primary font-bold text-xl">
        GigFlow
      </Link>

      {isAuthenticated && (
        <div className="flex gap-5 items-center">
          <Link to="/" className="hover:text-primary">
            Browse Gigs
          </Link>
          <Link to="/create-gig" className="hover:text-primary">
            Post Gig
          </Link>
          <Link to="/my-gigs" className="hover:text-primary">
            My Gigs
          </Link>
          <Link to="/my-bids" className="hover:text-primary">
            My Bids
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
