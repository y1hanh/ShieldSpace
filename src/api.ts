const API_BASE_URL = 'https://api.shieldspace.games';

export const getCountBullyingData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/visualization`);
    console.log(response);
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
