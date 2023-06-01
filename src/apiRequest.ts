import { API_BASE_URL } from "./routes/routes";

const API_URL = `${API_BASE_URL}/students`;
const token = localStorage.getItem("token");

const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error('An error occurred while making the request.');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchStudents = async () => {
  return apiRequest(API_URL);
};

export const addStudent = async (student: any) => {
  return apiRequest(API_URL, {
    method: 'POST',
    body: JSON.stringify(student),
  });
};

export const addUser = async (user: any) => {
  return apiRequest(`${API_BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
};

export const authUser = async (user: any) => {
  return apiRequest(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
};

export const updateStudent = async (student: any) => {
  const url = `${API_URL}/${student.id}`;
  return apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(student),
  });
};

export const deleteStudent = async (studentId: number) => {
  const url = `${API_URL}/${studentId}`;
  return apiRequest(url, {
    method: 'DELETE',
  });
};
