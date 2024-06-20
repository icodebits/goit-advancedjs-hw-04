import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    currentPage = 1;
    currentQuery = e.target.searchQuery.value.trim();
    if (currentQuery) {
        await fetchImages(currentQuery, currentPage);
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    await fetchImages(currentQuery, currentPage);
});

async function fetchImages(query, page) {
    const apiKey = '44486034-0380855ab7a69aa1783ee0e98';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.hits.length === 0 && page === 1) {
            iziToast.info({ title: 'Info', message: 'Sorry, there are no images matching your search query. Please try again.' });
        } else {
            if (page === 1) {
              iziToast.success({ title: 'Success', message: `Hooray! We found ${data.totalHits} images.` });
            }
            renderImages(data.hits);
            if (data.totalHits > page * 40) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
                if (page > 1) {
                    iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
                }
            }
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to fetch images. Please try again later.' });
    }
}

function renderImages(images) {
    const markup = images.map(image => `
        <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b> ${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b> ${image.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b> ${image.downloads}
                </p>
            </div>
        </div>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
}
