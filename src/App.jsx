import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import './App.css';
import Header from './Header.jsx';
import LandingPage from './LandingPage.jsx';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';


import { AuthProvider } from './context/AuthContext.jsx';


import ChatWidget from './components/ChatWidget.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Header />}
      {children || <Outlet />}
      <ChatWidget />
    </>
  );
};

import { ThemeProvider } from './context/ThemeContext.jsx';



function App() {
  return (
    <div className="App bg-gray-100 dark:bg-[#0b0f19] min-h-screen transition-colors duration-300">
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout><LandingPage /></Layout>} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/login" element={<Login />} />

              <Route path="/dashboard" element={
                <>
                  <Dashboard />
                  <ChatWidget />
                </>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
      <Analytics />
    </div>
  );
}

export default App;
