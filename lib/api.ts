export const httpRequest = async (url: string, key: any) =>
  fetch(url, key)
    .then((response) => response.json())
    .catch((error) => error);
