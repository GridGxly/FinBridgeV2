import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import './App.css';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import About from './About.jsx';
import Login from './Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />


            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Route>


            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Analytics />
    </div>
  );
}

export default App;
