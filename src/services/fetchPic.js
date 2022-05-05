import axios from 'axios';

const MY_KEY = '27070278-032b8380727104f4ddf658ef6';
const BASE_URL = 'https://pixabay.com/api/';

const customAxios = axios.create({
  baseURL: BASE_URL,
  params: {
    key: MY_KEY,
  },
});

export const fetchParams = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

export async function fetchPic(params) {
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

// ////////////variant 2///////////////////////////////

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
// export default fetchPic;
