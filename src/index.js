import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import refs from './services/refs';
import fetchPic from './services/fetchPic';
import pageOption from './services/pageOption';
import markupList from './components/picMarkup';

let page = 1;
let lightbox = null;

const searchInput = e => {
  e.preventDefault();
  refs.galleryDiv.innerHTML = '';
  if (!refs.input.value) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );

    return;
  }
  page = 1;
  refs.loadMoreBtn.classList.remove('visually-hidden');

  const name = refs.input.value.trim();
  fetchPic(name, page)
    .then(data => {
      markupList(data.hits);
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      const maxPage = Math.ceil(data.totalHits / pageOption.maxImg);
      refs.loadMoreBtn.classList.remove('visually-hidden');
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      if (page >= maxPage) {
        refs.loadMoreBtn.classList.add('visually-hidden');
      }
    })
    .catch(new Error());
};

const loadMore = e => {
  page += 1;
  const name = refs.input.value.trim();
  fetchPic(name, page)
    .then(data => {
      markupList(data.hits);
      lightbox.refresh();
      const maxPage = Math.ceil(data.totalHits / pageOption.maxImg);
      if (page >= maxPage) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add('visually-hidden');
      }
    })
    .catch(new Error());
};

refs.formSubmit.addEventListener('submit', searchInput);
refs.loadMoreBtn.addEventListener('click', loadMore);
