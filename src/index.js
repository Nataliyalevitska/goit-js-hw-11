import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import refs from './services/refs';
import { fetchParams, fetchPic } from './services/fetchPic';
// import pageOption from './services/pageOption';
import markupList from './components/picMarkup';
import $ from 'jquery';

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

  fetchParams.page = 1;
  refs.loadMoreBtn.classList.add('visually-hidden');

  fetchParams.q = refs.input.value.trim();
  fetchPic(fetchParams)
    .then(data => {
      markupList(data.hits);
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      const maxPage = Math.ceil(data.totalHits / fetchParams.per_page);

      refs.loadMoreBtn.classList.remove('visually-hidden');
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      if (fetchParams.page >= maxPage) {
        refs.loadMoreBtn.classList.add('visually-hidden') || smoothScroll();
      }
    })
    .catch(new Error());
};

const loadMore = e => {
  fetchParams.page += 1;
  fetchParams.q = refs.input.value.trim();
  fetchPic(fetchParams)
    .then(data => {
      markupList(data.hits);
      lightbox.refresh();
      const maxPage = Math.ceil(data.totalHits / fetchParams.per_page);

      if (fetchParams.page >= maxPage) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add('visually-hidden') || smoothScroll();
      }
    })
    .catch(new Error());
};

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}

function handleScroll(e) {
  let topHeight = document.documentElement.scrollTop;
  let clHeight = document.documentElement.clientHeight;
  let scrHeight = document.documentElement.scrollHeight;
  if (Math.round(clHeight + topHeight) === scrHeight) {
    loadMore();
  }
}

document.addEventListener('scroll', handleScroll);
refs.formSubmit.addEventListener('submit', searchInput);
refs.loadMoreBtn.addEventListener('click', loadMore, smoothScroll);

///////// скрол вгору //////////////
class Pagescroll {
  constructor(id) {
    this.page = $(id);
    this.topLink = this.page.find('.topLink');
    $(window).scroll(this.showHideTopLink.bind(this));
    this.topLink.click(this.slowScroll.bind(this));
  }

  showHideTopLink() {
    if ($(window).scrollTop() > 300) {
      this.topLink.fadeIn(1000);
    } else {
      this.topLink.fadeOut(1000);
    }
  }
  slowScroll(event) {
    event.preventDefault();
    $('html, body').stop().animate({ scrollTop: 0 }, 1000);
  }
}
const scroll = new Pagescroll('#page1');

//////////////////// variant 2///////////////////////////
// let page = 1;
// let lightbox = null;

// const searchInput = e => {
//   e.preventDefault();
//   refs.galleryDiv.innerHTML = '';
//   if (!refs.input.value) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.',
//     );

//     return;
//   }
//   page = 1;

//   refs.loadMoreBtn.classList.remove('visually-hidden');

//   const name = refs.input.value.trim();
//   fetchPic(name, page)
//     .then(data => {
//       markupList(data.hits);
//       lightbox = new SimpleLightbox('.gallery a', {
//         captionsData: 'alt',
//         captionDelay: 250,
//       });

//       const maxPage = Math.ceil(data.totalHits / pageOption.maxImg);

//       refs.loadMoreBtn.classList.remove('visually-hidden');
//       Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
//       if (page >= maxPage) {
//         refs.loadMoreBtn.classList.add('visually-hidden') || smoothScroll();
//       }
//     })
//     .catch(new Error());
// };

// const loadMore = e => {
//   page += 1;
//   const name = refs.input.value.trim();
//   fetchPic(name, page)
//     .then(data => {
//       markupList(data.hits);
//       lightbox.refresh();
//       const maxPage = Math.ceil(data.totalHits / pageOption.maxImg);

//       if (page >= maxPage) {
//         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//         refs.loadMoreBtn.classList.add('visually-hidden') || smoothScroll();
//       }
//     })
//     .catch(new Error());
// };
