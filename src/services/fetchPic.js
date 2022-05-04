import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/?key=';
// const MY_KEY = '27070278-032b8380727104f4ddf658ef6';

// async function fetchPic(currentPic, page) {
//   const res = await axios.get(
//     `${BASE_URL}${MY_KEY}&q=${currentPic}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`,
//   );

//   if (res.status > 200) {
//     return Promise.reject(
//       new Error(),
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.',
//       ),
//     );
//   }
//   return res.data;
// }

// const fetchParams = {
//   q: '',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page: 40,
//   page: 1,
// };

const MY_KEY = '27070278-032b8380727104f4ddf658ef6';
const BASE_URL = 'https://pixabay.com/api/?key=';
const customAxios = axios.create({
  baseURL: BASE_URL,
  params: {
    key: MY_KEY,
  },
});

axios.defaults.params['key'] = MY_KEY;

async function fetchPic(params) {
  const res = await customAxios.get('', { params });

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
fetchPic(fetchParams);

export default fetchPic;
