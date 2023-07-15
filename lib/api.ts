export const httpRequest = async (url: string, key: RequestInit) =>
  fetch(url, key)
    .then((response) => response.json())
    .catch((error) => error);
