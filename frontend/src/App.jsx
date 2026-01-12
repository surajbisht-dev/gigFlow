import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/layout/Navbar";

// these are auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// gig pages
import BrowseGigs from "./pages/gigs/BrowseGigs";
import CreateGig from "./pages/gigs/CreateGig";
import MyGigs from "./pages/gigs/MyGigs";
import GigBids from "./pages/gigs/GigBids";

// bid page
import MyBids from "./pages/bids/MyBids";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes fro logged in users */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BrowseGigs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-gig"
            element={
              <ProtectedRoute>
                <CreateGig />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-gigs"
            element={
              <ProtectedRoute>
                <MyGigs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bids/:gigId"
            element={
              <ProtectedRoute>
                <GigBids />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bids"
            element={
              <ProtectedRoute>
                <MyBids />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
