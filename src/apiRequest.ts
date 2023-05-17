const API_URL = "http://localhost:8000";

const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
};

export const updateStudent = async (student: any) => {
  const url = `${API_URL}/${student.id}`;
  return apiRequest(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
};

export const deleteStudent = async (id: number) => {
  const url = `${API_URL}/${id}`;
  return apiRequest(url, {
    method: 'DELETE',
  });
};