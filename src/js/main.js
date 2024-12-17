import { fetchImages } from './pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  showInfo,
} from './render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const inputField = document.querySelector('input[name="searchQuery"]');

let currentPage = 1;
let query = '';
let galleryLightbox = new SimpleLightbox('.gallery a');

// Select loader directly from HTML
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = inputField.value.trim();

  if (!query) {
    showInfo('Please enter a search term.');
    return;
  }
  clearGallery();
  currentPage = 1;
  showLoader();

  try {
    const startTime = Date.now();
    const data = await fetchImages(query, currentPage);

    const delay = Math.max(500 - (Date.now() - startTime), 0);
    setTimeout(() => {
      if (!data.hits || data.hits.length === 0) {
        showInfo(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        hideLoader();
        return;
      }
      renderGallery(data.hits);
      galleryLightbox.refresh();
      hideLoader();
    }, delay);
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      showError(
        'Sorry, there was an error fetching images. Please try again later.'
      );
      hideLoader();
    }, 500);
  }
});

window.addEventListener('scroll', async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !loader.classList.contains('hidden')
  ) {
    currentPage += 1;
    showLoader();

    try {
      const startTime = Date.now();
      const data = await fetchImages(query, currentPage);

      const delay = Math.max(500 - (Date.now() - startTime), 0);
      setTimeout(() => {
        if (!data.hits || data.hits.length === 0) {
          showInfo('No more images to load.');
          hideLoader();
          return;
        }
        renderGallery(data.hits);
        galleryLightbox.refresh();
        hideLoader();
      }, delay);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        showInfo('No more images to load.');
        hideLoader();
      }, 500);
    }
  }
});
