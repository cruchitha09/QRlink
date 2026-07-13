import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import toast from 'react-hot-toast';
import { FiCopy, FiExternalLink, FiDownload, FiTrash2, FiCalendar } from 'react-icons/fi';
import { buildShortUrl, copyToClipboard, formatDate } from '../utils/helpers.js';

export default function LinkCard({ link, onDelete }) {
  const shortCode = link.shortCode || link.short_code || link.code;
  const shortUrl = link.shortUrl || (shortCode ? buildShortUrl(shortCode) : '');
  const originalUrl = link.originalUrl || link.original_url || link.longUrl || link.url;
  const createdAt = link.createdAt || link.created_at;

  const handleCopy = async () => {
    const ok = await copyToClipboard(shortUrl);
    ok ? toast.success('Short URL copied!') : toast.error('Copy failed');
  };

  const handleDownload = () => {
    const canvas = document.getElementById(`qr-${shortCode}`);
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrlink-${shortCode}.png`;
    a.click();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      className="glass glass-hover p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Original</p>
          <p className="text-sm text-white/90 truncate" title={originalUrl}>{originalUrl}</p>
          <p className="text-xs uppercase tracking-wider text-white/40 mt-3 mb-1">Short</p>
          <a href={shortUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold gradient-text truncate block">
            {shortUrl}
          </a>
        </div>
        <div className="shrink-0 p-2 bg-white rounded-xl">
          <QRCodeCanvas id={`qr-${shortCode}`} value={shortUrl} size={72} includeMargin={false} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-white/50">
        <FiCalendar /> {formatDate(createdAt) || 'Recently created'}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleCopy} className="btn-ghost py-2 px-2 text-xs" title="Copy short URL"><FiCopy /></button>
        <a href={shortUrl} target="_blank" rel="noreferrer" className="btn-ghost py-2 px-2 text-xs justify-center" title="Open"><FiExternalLink /></a>
        <button onClick={handleDownload} className="btn-ghost py-2 px-2 text-xs" title="Download QR"><FiDownload /></button>
        <button
          onClick={() => onDelete?.(link)}
          className="py-2 px-2 rounded-xl text-xs border border-red-400/30 text-red-300 bg-red-500/10 hover:bg-red-500/20 transition"
          title="Delete"
        >
          <FiTrash2 className="mx-auto" />
        </button>
      </div>
    </motion.div>
  );
}
