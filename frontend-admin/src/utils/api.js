class FetchError extends Error {
  constructor(message, errorsArr = []) {
    super(message);
    this.errorDetails = [...errorsArr];
  }
}

export async function post(endpoint, body) {
  const url = import.meta.env.VITE_API_URL + endpoint;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!data.success) {
      throw new FetchError(data.message, data.errorDetails);
    }

    return data.data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error: Server is offline or unreachable.');
    }
    throw error;
  }
}
