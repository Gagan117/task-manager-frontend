import axios from 'axios';

//const API_URL = 'http://localhost:3000/tasks'; // backend URL
const API_URL = 'https://api.gaganvirbhullar.me/tasks'; // update this

// Get all tasks
export const getTasks = () => axios.get(API_URL);

// Create a new task
export const createTask = (task) => axios.post(API_URL, task);

// Update a task by ID
export const updateTask = (id, updates) => axios.put(`${API_URL}/${id}`, updates);

// Delete a task by ID
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);