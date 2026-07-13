import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { QRCodeCanvas } from 'qrcode.react';
import { FiLink, FiCopy, FiDownload, FiRefreshCw, FiZap, FiExternalLink } from 'react-icons/fi';
import { linksAPI } from '../services/api.js';
import { buildShortUrl, copyToClipboard, isValidUrl } from '../utils/helpers.js';

export default function CreateLink() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return toast.error('Please enter a URL');
    if (!isValidUrl(url)) return toast.error('Enter a valid URL (http/https)');
    try {
      setLoading(true);
      const { data } = await linksAPI.create({ originalUrl: url, url });
      const payload = data.link || data.data || data;
      const shortCode = payload.shortCode || payload.short_code || payload.code;
      const shortUrl = payload.shortUrl || (shortCode ? buildShortUrl(shortCode) : '');
      setResult({
        originalUrl: payload.originalUrl || payload.original_url || url,
        shortUrl,
        shortCode,
      });
      toast.success('Short link created!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create link');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(result.shortUrl);
    ok ? toast.success('Copied to clipboard') : toast.error('Copy failed');
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qr-preview');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrlink-${result.shortCode || 'code'}.png`;
    a.click();
  };

  const reset = () => {
    setResult(null);
    setUrl('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Create a <span className="gradient-text">short link</span>
        </h1>
        <p className="text-white/60 mt-3">Paste any URL — get a beautiful short link and QR code.</p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-5">
          <div>
            <label className="label">Long URL</label>
            <div className="relative">
              <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={url} onChange={(e) => setUrl(e.target.value)}
                className="input pl-10"
                placeholder="https://example.com/your-very-long-url"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Generating...' : (<><FiZap /> Generate Short URL</>)}
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 sm:p-8 space-y-6"
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Original URL</p>
            <p className="text-sm text-white/80 break-all">{result.originalUrl}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Short URL</p>
            <a href={result.shortUrl} target="_blank" rel="noreferrer" className="text-xl font-bold gradient-text break-all">
              {result.shortUrl}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 bg-white rounded-2xl shadow-lg">
              <QRCodeCanvas id="qr-preview" value={result.shortUrl} size={180} includeMargin={false} />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 w-full">
              <button onClick={handleCopy} className="btn-ghost"><FiCopy /> Copy</button>
              <a href={result.shortUrl} target="_blank" rel="noreferrer" className="btn-ghost justify-center"><FiExternalLink /> Open</a>
              <button onClick={handleDownload} className="btn-ghost"><FiDownload /> QR</button>
              <button onClick={reset} className="btn-primary"><FiRefreshCw /> New</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
