// api.js

import axios from 'axios';

const API_BASE = 'https://go-task-manager-production.up.railway.app';

const api = axios.create({
    baseURL: API_BASE,
});

// AUTH
export const signup = (username, password) =>
    api.post('/signup', { username, password });

export const login = async (username, password) => {
    const res = await api.post('/login', { username, password });
    const { token } = res.data;
    localStorage.setItem('token', token);
    return token;
};

// TASKS
export const getTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const createTask = async (title) => {
    const token = localStorage.getItem('token');
    const res = await api.post(
        '/tasks',
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const completeTask = async (id) => {
    const token = localStorage.getItem('token');
    await api.put(
        `/tasks/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Optional: export api instance in case you need it elsewhere
export default api;
