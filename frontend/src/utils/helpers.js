import { API_BASE_URL } from '../services/api.js';

export const buildShortUrl = (shortCode) => `${API_BASE_URL}/${shortCode}`;

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const isValidUrl = (url) => {
  try {
    const u = new URL(url);
    return !!u.protocol.startsWith('http');
  } catch {
    return false;
  }
};
