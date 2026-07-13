import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { linksAPI } from '../services/api.js';
import LinkCard from '../components/LinkCard.jsx';

export default function MyLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data } = await linksAPI.myLinks();
      const items = Array.isArray(data) ? data : (data.links || data.data || []);
      setLinks(items);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleDelete = async (link) => {
    const id = link.id || link._id;
    if (!id) return toast.error('Missing link id');
    if (!confirm('Delete this short link?')) return;
    try {
      await linksAPI.remove(id);
      setLinks((prev) => prev.filter((l) => (l.id || l._id) !== id));
      toast.success('Link deleted');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    }
  };

  const filtered = links.filter((l) => {
    const q = query.toLowerCase();
    if (!q) return true;
    return (
      (l.originalUrl || l.original_url || '').toLowerCase().includes(q) ||
      (l.shortCode || l.short_code || l.code || '').toLowerCase().includes(q)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            My <span className="gradient-text">Links</span>
          </h1>
          <p className="text-white/60 mt-1 text-sm">Manage and share all your short links.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchLinks} className="btn-ghost py-2 px-4 text-sm"><FiRefreshCw /> Refresh</button>
          <Link to="/create" className="btn-primary py-2 px-4 text-sm"><FiPlus /> New Link</Link>
        </div>
      </div>

      <div className="glass p-4 mb-8">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            className="input pl-10" placeholder="Search by URL or short code..."
          />
        </div>
      </div>

      {loading ? (
        <div className="glass p-16 text-center text-white/60">Loading your links...</div>
      ) : filtered.length === 0 ? (
        <div className="glass p-16 text-center">
          <p className="text-white/70 mb-6">{links.length === 0 ? 'You have no links yet.' : 'No links match your search.'}</p>
          {links.length === 0 && (
            <Link to="/create" className="btn-primary"><FiPlus /> Create your first link</Link>
          )}
        </div>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((l) => (
              <LinkCard key={l.id || l._id || l.shortCode} link={l} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
