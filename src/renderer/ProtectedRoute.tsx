import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Mengecualikan rute "Home" dari perlindungan
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  if (!token) {
    // Jika token tidak tersedia dan bukan di rute "Home", arahkan ke halaman login
    return <Navigate to="/" state={{ from: location }} />;
    // navigate('/');
  }

  // Jika token tersedia, tampilkan komponen yang ingin dilindungi
  return <>{children}</>;
};

export default ProtectedRoute;
