import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { fetchPhotos, uploadPhoto, updatePhoto, deletePhoto } from '../../services/api';
import { fetchTimeline, createTimelineEvent, deleteTimelineEvent } from '../../services/api';
import { fetchAllLetters, createLetter } from '../../services/api';
import { Heart, LogOut, Upload, Trash2, Image, Clock, Mail, Plus, X } from 'lucide-react';

const TAB = { photos: 'Photos', timeline: 'Timeline', letter: 'Letter' };

function PhotosTab() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ caption: '', memoryNote: '', date: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const load = () => fetchPhotos().then((r) => setPhotos(r.data.data));
  useEffect(() => { load(); }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('caption', form.caption);
    fd.append('memoryNote', form.memoryNote);
    fd.append('date', form.date);
    await uploadPhoto(fd);
    setFile(null); setPreview('');
    setForm({ caption: '', memoryNote: '', date: '' });
    await load();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this memory?')) return;
    await deletePhoto(id);
    await load();
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="bg-[#fdf9f0] border border-[#e8d5b7] rounded-2xl p-6">
        <h3 className="font-playfair text-lg text-[#5c3d2e] italic mb-4">Add a Memory</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div
            className="border-2 border-dashed border-[#e8d5b7] rounded-xl p-6 text-center cursor-pointer hover:border-[#c4a882] transition-colors"
            onClick={() => document.getElementById('photo-input').click()}
          >
            {preview ? (
              <img src={preview} className="max-h-48 mx-auto object-contain rounded" alt="preview" />
            ) : (
              <div className="text-[#b8a090]">
                <Upload size={28} className="mx-auto mb-2 opacity-50" />
                <p className="font-lora text-sm">Click to choose a photo</p>
              </div>
            )}
            <input
              id="photo-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
              placeholder="Caption…"
              value={form.caption}
              onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
            />
            <input
              type="date"
              className="px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <textarea
            className="w-full px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882] resize-none"
            rows={2}
            placeholder="Memory note (shown on hover)…"
            value={form.memoryNote}
            onChange={(e) => setForm((f) => ({ ...f, memoryNote: e.target.value }))}
          />
          <button type="submit" disabled={loading || !file} className="btn-vintage text-sm flex items-center gap-2 disabled:opacity-50">
            <Upload size={14} /> {loading ? 'Uploading…' : 'Upload Photo'}
          </button>
        </form>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p) => (
          <div key={p._id} className="relative group rounded-xl overflow-hidden border border-[#e8d5b7]">
            <img src={p.imageUrl} className="w-full h-40 object-cover" alt={p.caption} />
            <div className="absolute inset-0 bg-[#5c3d2e]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => handleDelete(p._id)}
                className="p-2 bg-red-400/80 rounded-full text-white hover:bg-red-500 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
            {p.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#5c3d2e]/70 to-transparent">
                <p className="font-dancing text-white text-sm truncate">{p.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineTab() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', emoji: '💕' });

  const load = () => fetchTimeline().then((r) => setEvents(r.data.data));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTimelineEvent(form);
    setForm({ title: '', description: '', date: '', emoji: '💕' });
    await load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await deleteTimelineEvent(id);
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#fdf9f0] border border-[#e8d5b7] rounded-2xl p-6">
        <h3 className="font-playfair text-lg text-[#5c3d2e] italic mb-4">Add Timeline Event</h3>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              className="px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
              placeholder="Event title…"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              type="date"
              className="px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              required
            />
            <input
              className="px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
              placeholder="Emoji (💕)"
              value={form.emoji}
              onChange={(e) => setForm((f) => ({ ...f, emoji: e.target.value }))}
            />
          </div>
          <textarea
            className="w-full px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882] resize-none"
            rows={2}
            placeholder="Description…"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <button type="submit" className="btn-vintage text-sm flex items-center gap-2">
            <Plus size={14} /> Add Event
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev._id} className="bg-[#fdf9f0] border border-[#e8d5b7] rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">{ev.emoji}</span>
              <div>
                <p className="font-playfair text-[#5c3d2e] font-medium">{ev.title}</p>
                <p className="font-lora text-xs text-[#b8a090]">
                  {new Date(ev.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button onClick={() => handleDelete(ev._id)} className="text-red-400 hover:text-red-600 transition p-1">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LetterTab() {
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    await createLetter(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-[#fdf9f0] border border-[#e8d5b7] rounded-2xl p-6">
      <h3 className="font-playfair text-lg text-[#5c3d2e] italic mb-4">Write / Update Love Letter</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          className="w-full px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-lora text-sm text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
          placeholder="Letter title…"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <textarea
          className="w-full px-3 py-3 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-crimson text-base text-[#5c3d2e] focus:outline-none focus:border-[#c4a882] resize-none leading-relaxed"
          rows={14}
          placeholder="Write from the heart…"
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          required
        />
        <input
          className="w-full px-3 py-2 bg-[#fdf6ee] border border-[#e8d5b7] rounded-lg font-dancing text-base text-[#5c3d2e] focus:outline-none focus:border-[#c4a882]"
          placeholder="Signature (e.g. Yours forever…)"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
        />
        <button type="submit" className="btn-vintage text-sm flex items-center gap-2">
          <Heart size={14} className="fill-current" />
          {saved ? 'Saved ✓' : 'Save Letter'}
        </button>
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('photos');

  const tabs = [
    { key: 'photos',   label: 'Photos',   icon: <Image size={16} /> },
    { key: 'timeline', label: 'Timeline', icon: <Clock size={16} /> },
    { key: 'letter',   label: 'Letter',   icon: <Mail size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6ee]">
      {/* Top Bar */}
      <div className="bg-[#fdf9f0] border-b border-[#e8d5b7] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Heart size={18} className="text-[#c9957d] fill-[#c9957d]" />
          <span className="font-playfair text-xl text-[#5c3d2e] italic">Memory Garden</span>
          <span className="font-lora text-xs text-[#b8a090] ml-1">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="font-lora text-sm text-[#8b6b4a] hover:text-[#5c3d2e] transition"
          >
            View Site ↗
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 font-lora text-sm text-[#b8a090] hover:text-[#5c3d2e] transition"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#fdf9f0] border border-[#e8d5b7] rounded-2xl p-1.5 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-lora text-sm transition-all duration-300 ${
                activeTab === t.key
                  ? 'bg-gradient-to-br from-[#e8d5b7] to-[#c4a882] text-[#5c3d2e] shadow-sm'
                  : 'text-[#8b6b4a] hover:text-[#5c3d2e]'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'photos'   && <PhotosTab />}
          {activeTab === 'timeline' && <TimelineTab />}
          {activeTab === 'letter'   && <LetterTab />}
        </motion.div>
      </div>
    </div>
  );
}
