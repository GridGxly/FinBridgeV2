import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import './App.css';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import InfoPage from './InfoPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import ChatWidget from './components/ChatWidget.jsx';

const Layout = ({ children }) => (
  <>
    <Header />
    {children || <Outlet />}
    <ChatWidget />
  </>
);

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/about/mission" element={<Layout><InfoPage title="Our Mission" content="To provide accessible financial tools to every community, bridging the wealth gap through technology and culture." /></Layout>} />
            <Route path="/about/impact" element={<Layout><InfoPage title="Community Impact" content="We have successfully connected over 10,000 families to better banking resources in 2024." /></Layout>} />
            <Route path="/about/diversity" element={<Layout><InfoPage title="Diversity & Inclusion" content="Finbridge is built by and for the communities we serve." /></Layout>} />
            <Route path="/resources/guides" element={<Layout><InfoPage title="Financial Guides" content="Browse our library of translated financial documents." /></Layout>} />
            <Route path="/resources/language" element={<Layout><InfoPage title="Language Support" content="We currently support 9 languages and are adding more soon." /></Layout>} />
            <Route path="/support" element={<Layout><InfoPage title="Help Center" content="Contact us at support@finbridge.com for assistance." /></Layout>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={
                <>
                  <Dashboard />
                  <ChatWidget />
                </>
              } />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Analytics />
    </div>
  );
}

export default App;
