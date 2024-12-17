export async function fetchImages(query, page = 1, perPage = 12) {
  const API_KEY = '47684004-d700c1255eaadac249fdd5630';
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    if (data.totalHits === 0 || !data.hits.length) {
      throw new Error('No images found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
