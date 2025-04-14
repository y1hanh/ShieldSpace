const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.shieldspace.games';

type Methond = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchWithSecureToken(path: string, method: Methond = 'GET', options: RequestInit = {}) {
  return fetch(`${API_BASE_URL}/${path}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    ...options,
  });
}

export const getSecureToken = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error('Wrong username or password');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching secure token:', error);
    throw error;
  }
};

export const getCountBullyingData = async () => {
  try {
    const response = await fetchWithSecureToken('visualization');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bullying data:', error);
    throw error;
  }
};
