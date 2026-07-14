// Shared Firestore client for the public blog pages.
// Loaded as native ES modules straight from the Firebase CDN — no bundler/build step,
// consistent with the rest of this repo. Public config values only; the real security
// boundary is Firestore rules (see Dotko_admin's firestore.rules `match /blogs/{slug}`).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA0vHcuK-xY_AxASr8nFkn8qcSv1I3q17M',
  authDomain: 'dotko-b2543.firebaseapp.com',
  projectId: 'dotko-b2543',
  storageBucket: 'dotko-b2543.firebasestorage.app',
  messagingSenderId: '874130474806',
  appId: '1:874130474806:web:ca3330de8e148ca5a1d597',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function tsToMillis(ts) {
  if (!ts) return 0;
  if (typeof ts.toMillis === 'function') return ts.toMillis();
  if (typeof ts.seconds === 'number') return ts.seconds * 1000;
  return 0;
}

export async function fetchPublishedPosts() {
  const snapshot = await getDocs(query(collection(db, 'blogs'), where('status', '==', 'published')));
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => tsToMillis(b.publishedAt || b.createdAt) - tsToMillis(a.publishedAt || a.createdAt));
}

export async function fetchPostBySlug(slug) {
  const snap = await getDoc(doc(db, 'blogs', slug));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Vercel rewrites keep the address bar at /blog/<slug>, so the slug is read from the
// path first. Falls back to ?slug= for quick local testing without `vercel dev`.
export function slugFromLocation() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  if (last && last !== 'blog' && last !== 'blog-post.html' && last !== 'blog.html') return last;
  return new URLSearchParams(window.location.search).get('slug') || '';
}

export function estimateReadTime(html) {
  const words = html
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

export function formatDate(ts) {
  const millis = tsToMillis(ts);
  if (!millis) return '';
  return new Date(millis).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}
