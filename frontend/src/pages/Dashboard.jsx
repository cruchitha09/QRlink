import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlus, FiList, FiBarChart2, FiUser, FiSettings, FiArrowRight, FiZap,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { linksAPI } from '../services/api.js';
import LinkCard from '../components/LinkCard.jsx';

const cards = [
  { to: '/create', icon: FiPlus, title: 'Create Short Link', desc: 'Turn any URL into a beautiful short link.', badge: 'New' },
  { to: '/my-links', icon: FiList, title: 'My Links', desc: 'Manage every link you have created.', badge: null },
  { to: '#', icon: FiBarChart2, title: 'Analytics', desc: 'Deep insights on clicks and reach.', badge: 'Soon' },
  { to: '#', icon: FiUser, title: 'Profile', desc: 'Manage your account and preferences.', badge: 'Soon' },
  { to: '#', icon: FiSettings, title: 'Settings', desc: 'Customize workspace and defaults.', badge: 'Soon' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await linksAPI.myLinks();
        const items = Array.isArray(data) ? data : (data.links || data.data || []);
        setRecent(items.slice(0, 3));
      } catch { /* ignore */ }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Welcome */}
      <div className="glass p-8 relative overflow-hidden mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-brand-pink/10 to-brand-blue/20 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-white/60 text-sm">Welcome back</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
              Hey <span className="gradient-text">{user?.name || 'creator'}</span>, ready to build?
            </h1>
            <p className="text-white/60 mt-2 text-sm">Create a new short link or manage your existing ones.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/create" className="btn-primary"><FiPlus /> Create Link</Link>
            <Link to="/my-links" className="btn-ghost"><FiList /> My Links</Link>
          </div>
        </div>
      </div>

      {/* Quick actions grid */}
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
          >
            <Link to={c.to} className="glass glass-hover p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-lg shadow-brand-purple/30">
                  <c.icon className="text-white text-xl" />
                </div>
                {c.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${c.badge === 'Soon' ? 'bg-white/5 text-white/50 border border-white/10' : 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30'}`}>
                    {c.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-white/60 flex-1">{c.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm gradient-text font-semibold">
                Open <FiArrowRight />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent links */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Links</h2>
        <Link to="/my-links" className="text-sm text-white/60 hover:text-white flex items-center gap-1">
          View all <FiArrowRight />
        </Link>
      </div>
      {loading ? (
        <div className="glass p-10 text-center text-white/60">Loading recent links...</div>
      ) : recent.length === 0 ? (
        <div className="glass p-10 text-center">
          <FiZap className="mx-auto text-3xl text-brand-pink mb-3" />
          <p className="text-white/70">No links yet. Create your first short link!</p>
          <Link to="/create" className="btn-primary mt-6"><FiPlus /> Create Link</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((l) => (
            <LinkCard key={l.id || l._id || l.shortCode} link={l} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
