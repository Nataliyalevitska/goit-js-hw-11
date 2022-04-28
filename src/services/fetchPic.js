import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?key=';
const MY_KEY = '27070278-032b8380727104f4ddf658ef6';

// const fetchPic = name => {
//   return fetch(
//     `${BASE_URL}${MY_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`,
//   ).then(res => {
//     if (!res.ok) {
//       return Promise.reject(
//         new Error(
//           Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.',
//           ),
//         ),
//       );
//     }
//     return res.json();
//   });
// };
// const incrementPage = () => page++;

//

// export { fetchPic, incrementPage };

async function fetchPic(currentPic, page) {
  const res = await axios.get(
    `${BASE_URL}${MY_KEY}&q=${currentPic}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
  );

  if (res.status > 200) {
    return Promise.reject(
      new Error(),
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      ),
    );
  }
  return res.data;
}

export default fetchPic;
