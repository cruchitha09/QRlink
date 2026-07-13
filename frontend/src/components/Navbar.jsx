import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiGrid, FiZap } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
    isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
  }`;

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-xl bg-black/30 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple via-brand-pink to-brand-blue flex items-center justify-center shadow-lg shadow-brand-purple/40"
            >
              <FiZap className="text-white" />
            </motion.div>
            <span className="text-xl font-extrabold tracking-tight">
              QR<span className="gradient-text">Link</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/create" className={navLinkClass}>Create</NavLink>
                <NavLink to="/my-links" className={navLinkClass}>My Links</NavLink>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-ghost py-2 px-4 text-sm">Login</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="btn-ghost py-2 px-4 text-sm">
                  <FiGrid /> {user?.name || 'Dashboard'}
                </Link>
                <button onClick={handleLogout} className="btn-primary py-2 px-4 text-sm">
                  <FiLogOut /> Logout
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/10 px-4 py-4 space-y-2 bg-black/40"
          >
            <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>Home</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                <NavLink to="/create" className={navLinkClass} onClick={() => setOpen(false)}>Create</NavLink>
                <NavLink to="/my-links" className={navLinkClass} onClick={() => setOpen(false)}>My Links</NavLink>
              </>
            )}
            <div className="pt-3 flex gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="btn-ghost flex-1 py-2 text-sm" onClick={() => setOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary flex-1 py-2 text-sm" onClick={() => setOpen(false)}>Get Started</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn-primary w-full py-2 text-sm">
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
