const API_BASE_URL = 'https://api.shieldspace.games';

type Methond = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchWithSecureToken(path: string, method: Methond = 'GET', options: RequestInit = {}) {
  const params: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhMzAiLCJwYXNzd29yZCI6ImZpdDUxMjB0YTMwIiwiaWF0IjoxNzQ2MDUzOTgyLCJleHAiOjE3NDYwODk5ODJ9.aMA5kaw2gVAisbYffohB57auIJawmv5QgiLF-USVRSI`,
      // `Bearer ${localStorage.getItem('token')}`,
    },
  };
  if (options?.body) {
    params.body = options.body;
  }
  return fetch(`${API_BASE_URL}/${path}`, params);
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

export const getEmotions = async (input: { user_input: string }) => {
  const body = {
    body: JSON.stringify(input),
  };

  try {
    const response = await fetchWithSecureToken('model/emotions', 'POST', body);

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
