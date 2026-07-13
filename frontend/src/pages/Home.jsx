import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiZap, FiLink, FiShield, FiBarChart2, FiSmartphone, FiGlobe, FiArrowRight,
  FiGithub, FiTwitter, FiLinkedin,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

const features = [
  { icon: FiLink, title: 'Instant Short Links', desc: 'Turn long URLs into elegant, shareable links in one click.' },
  { icon: FiZap, title: 'QR Code Generation', desc: 'Every link comes with a beautifully rendered QR code, ready to download.' },
  { icon: FiShield, title: 'Secure by Default', desc: 'JWT authentication, hashed passwords, and hardened endpoints.' },
  { icon: FiBarChart2, title: 'Built for Insights', desc: 'Track your links from a clean, modern dashboard.' },
  { icon: FiSmartphone, title: 'Fully Responsive', desc: 'A premium experience across desktop, tablet, and mobile.' },
  { icon: FiGlobe, title: 'Share Anywhere', desc: 'Perfect for social, print, packaging, decks, and campaigns.' },
];

const steps = [
  { n: '01', title: 'Create your account', desc: 'Sign up in seconds — no credit card required.' },
  { n: '02', title: 'Paste your URL', desc: 'Drop any long link into the create form.' },
  { n: '03', title: 'Share your short link', desc: 'Copy the URL or download the QR and go live.' },
];

const stack = [
  { name: 'React', color: 'from-sky-400 to-blue-500' },
  { name: 'Vite', color: 'from-purple-400 to-fuchsia-500' },
  { name: 'Tailwind CSS', color: 'from-cyan-400 to-teal-500' },
  { name: 'Framer Motion', color: 'from-pink-400 to-rose-500' },
  { name: 'Node.js', color: 'from-emerald-400 to-green-500' },
  { name: 'Express', color: 'from-slate-300 to-slate-500' },
  { name: 'MySQL', color: 'from-amber-400 to-orange-500' },
  { name: 'JWT', color: 'from-indigo-400 to-violet-500' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/70 backdrop-blur"
            >
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" /> Premium URL Shortener + QR Codes
            </motion.span>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
            >
              Shorten links.<br />
              <span className="gradient-text">Share brilliance.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="mt-6 text-lg text-white/70 max-w-xl"
            >
              QRLink is your all-in-one platform for creating elegant short links
              and instant QR codes — designed for creators, teams, and modern brands.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn-primary">
                Get Started <FiArrowRight />
              </Link>
              <Link to={isAuthenticated ? '/create' : '/login'} className="btn-ghost">
                {isAuthenticated ? 'Create a Link' : 'Login'}
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="mt-10 flex items-center gap-6 text-white/50 text-sm"
            >
              <div><span className="text-white font-bold text-xl">10k+</span> links created</div>
              <div className="w-px h-8 bg-white/10" />
              <div><span className="text-white font-bold text-xl">99.9%</span> uptime</div>
              <div className="w-px h-8 bg-white/10" />
              <div><span className="text-white font-bold text-xl">A+</span> security</div>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="glass p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-pink/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-brand-blue/40 rounded-full blur-3xl" />

              <div className="relative space-y-4">
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-2">qrlink.app</span>
                </div>

                <div className="glass p-4">
                  <p className="text-xs text-white/50 mb-1">Original URL</p>
                  <p className="text-sm text-white/80 truncate">https://example.com/very/long/path/to/a/beautiful/article-123</p>
                </div>
                <div className="glass p-4">
                  <p className="text-xs text-white/50 mb-1">Short URL</p>
                  <p className="text-sm font-semibold gradient-text">qrlink.io/aX9tB2</p>
                </div>

                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-3 bg-white rounded-xl"
                  >
                    <div className="w-24 h-24 grid grid-cols-6 grid-rows-6 gap-[2px]">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className={`rounded-sm ${Math.random() > 0.45 ? 'bg-black' : 'bg-white'}`} />
                      ))}
                    </div>
                  </motion.div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink w-4/5" />
                    <div className="h-2 rounded-full bg-white/10 w-3/5" />
                    <div className="h-2 rounded-full bg-white/10 w-2/5" />
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/70">
                      <FiZap className="text-brand-pink" /> Ready to share
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Everything you need to <span className="gradient-text">share smarter</span>
            </h2>
            <p className="mt-4 text-white/70">
              A carefully crafted toolkit that pairs powerful features with a beautiful, distraction-free interface.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                whileHover={{ y: -6 }}
                className="glass glass-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center mb-4 shadow-lg shadow-brand-purple/30">
                  <f.icon className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              How <span className="gradient-text">QRLink</span> works
            </h2>
            <p className="mt-4 text-white/70">Three simple steps from long URL to a beautifully shareable short link.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass p-8 relative overflow-hidden"
              >
                <div className="text-6xl font-extrabold gradient-text opacity-80">{s.n}</div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-white/60 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="stack" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Built with a <span className="gradient-text">modern stack</span>
            </h2>
            <p className="mt-4 text-white/70">
              Battle-tested tools chosen for speed, security, and delightful developer experience.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {stack.map((t, i) => (
              <motion.span
                key={t.name}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                whileHover={{ scale: 1.06 }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${t.color} shadow-lg shadow-black/30`}
              >
                {t.name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="glass p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-brand-pink/10 to-brand-blue/20 pointer-events-none" />
            <h2 className="relative text-4xl sm:text-5xl font-extrabold tracking-tight">
              Ready to <span className="gradient-text">launch your link?</span>
            </h2>
            <p className="relative mt-4 text-white/70">
              Join thousands of creators using QRLink to share smarter every day.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-4 justify-center">
              <Link to={isAuthenticated ? '/create' : '/register'} className="btn-primary">
                {isAuthenticated ? 'Create a Link' : 'Get Started Free'} <FiArrowRight />
              </Link>
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className="btn-ghost">
                {isAuthenticated ? 'Open Dashboard' : 'Login'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple via-brand-pink to-brand-blue flex items-center justify-center">
                <FiZap />
              </div>
              <span className="text-xl font-extrabold">QR<span className="gradient-text">Link</span></span>
            </div>
            <p className="mt-4 text-white/60 max-w-md text-sm">
              A premium URL shortener and QR code studio for modern teams and creators.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#how" className="hover:text-white">How it works</a></li>
              <li><a href="#stack" className="hover:text-white">Tech Stack</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-3">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"><FiGithub /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"><FiTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center"><FiLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} QRLink. Crafted with care.
        </div>
      </footer>
    </motion.div>
  );
}
