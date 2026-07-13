import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16"
    >
      <div className="glass p-12 max-w-lg text-center">
        <div className="text-8xl font-extrabold gradient-text">404</div>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-white/60">The link you followed may be broken, or the page has moved.</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn-primary"><FiHome /> Go Home</Link>
          <button onClick={() => window.history.back()} className="btn-ghost"><FiArrowLeft /> Go Back</button>
        </div>
      </div>
    </motion.div>
  );
}
