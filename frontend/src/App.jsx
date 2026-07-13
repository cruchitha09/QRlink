import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateLink from './pages/CreateLink.jsx';
import MyLinks from './pages/MyLinks.jsx';
import NotFound from './pages/NotFound.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateLink />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-links"
          element={
            <ProtectedRoute>
              <MyLinks />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* glowing blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-brand-pink/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-brand-blue/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
      </div>

      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(20,20,30,0.9)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </div>
  );
}
