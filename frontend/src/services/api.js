import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api' 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchPhotos         = ()           => API.get('/photos');
export const uploadPhoto         = (formData)   => API.post('/photos', formData);
export const updatePhoto         = (id, data)   => API.put(`/photos/${id}`, data);
export const deletePhoto         = (id)         => API.delete(`/photos/${id}`);

export const fetchTimeline       = ()           => API.get('/timeline');
export const createTimelineEvent = (data)       => API.post('/timeline', data);
export const updateTimelineEvent = (id, data)   => API.put(`/timeline/${id}`, data);
export const deleteTimelineEvent = (id)         => API.delete(`/timeline/${id}`);

export const fetchLetter         = ()           => API.get('/letter');
export const fetchAllLetters     = ()           => API.get('/letter/all');
export const createLetter        = (data)       => API.post('/letter', data);
export const updateLetter        = (id, data)   => API.put(`/letter/${id}`, data);

export const adminLogin          = (data)       => API.post('/auth/login', data);
export const adminSetup          = ()           => API.post('/auth/setup');

export default API;
