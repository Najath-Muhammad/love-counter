import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Heart, Lock } from 'lucide-react';

export default function AdminLogin() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <div className="min-h-screen bg-[#fdf6ee] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#fdf9f0] border border-[#e8d5b7] rounded-3xl p-10 shadow-[0_8px_40px_rgba(92,61,46,0.12)]">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#e8d5b7] to-[#c4a882] mb-4">
              <Lock size={22} className="text-[#5c3d2e]" />
            </div>
            <h1 className="font-playfair text-3xl text-[#5c3d2e] italic">Admin</h1>
            <p className="font-dancing text-[#c9957d] text-lg mt-1">Memory Keeper</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-lora text-sm text-[#8b6b4a] mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 bg-[#fdf6ee] border border-[#e8d5b7] rounded-xl font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 transition"
                placeholder="admin@lovecounter.com"
                required
              />
            </div>

            <div>
              <label className="block font-lora text-sm text-[#8b6b4a] mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-3 bg-[#fdf6ee] border border-[#e8d5b7] rounded-xl font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/20 transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="font-lora text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-vintage py-3 mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="font-lora text-sm">Entering…</span>
              ) : (
                <>
                  <Heart size={14} className="fill-current" />
                  <span className="font-lora text-sm">Enter the Garden</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
