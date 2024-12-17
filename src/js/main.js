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
import 'loaders.css/loaders.min.css';

const searchForm = document.querySelector('#search-form');
const inputField = document.querySelector('input[name="searchQuery"]');
const loaderContainer = document.createElement('div');
loaderContainer.classList.add('loader', 'hidden');
loaderContainer.innerHTML = `<div class="loader-inner ball-pulse">
  <div></div>
  <div></div>
  <div></div>
</div>`;
document.body.appendChild(loaderContainer);

let currentPage = 1;
let query = '';
let galleryLightbox = new SimpleLightbox('.gallery a');

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
    const data = await fetchImages(query, currentPage);

    if (!data.hits || data.hits.length === 0) {
      showInfo(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    renderGallery(data.hits);
    galleryLightbox.refresh();
  } catch (error) {
    console.error(error);
    showError(
      'Sorry, there was an error fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
  }
});

window.addEventListener('scroll', async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    currentPage += 1;
    showLoader();

    try {
      const data = await fetchImages(query, currentPage);

      if (!data.hits || data.hits.length === 0) {
        showInfo('No more images to load.');
        return;
      }

      renderGallery(data.hits);
      galleryLightbox.refresh();
    } catch (error) {
      console.error(error);
      showInfo('No more images to load.');
    } finally {
      hideLoader();
    }
  }
});
