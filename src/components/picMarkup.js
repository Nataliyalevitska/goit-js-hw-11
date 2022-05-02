import refs from '../services/refs';
import photoCard from '../templates/photoCard.hbs';

// function markupList(data) {
// const markUp = data
//   .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//       return `<div class="photo-card">
//   <a href="${largeImageURL}" ><img class ="images"src="${webformatURL}" alt="${tags}" loading="lazy"  /></a>
//   <div class="info">
//     <p class="info-item">likes:
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">views:
//       <b> ${views}</b>
//     </p>
//     <p class="info-item">comments:
//       <b> ${comments}</b>
//     </p>
//     <p class="info-item">downloads:
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>
// `;
// })
// .join('');

// const markupList = data => {
//   const markUp = data.map(data => photoCard(data).join(''));
//   refs.galleryDiv.insertAdjacentHTML('beforeend', markUp);
// };

// }

// function markupList(data) {
//   const markUp = data.map(data => photoCard(data).join(''));
//   refs.galleryDiv.insertAdjacentHTML('beforeend', markUp);
// }
function markupList(data) {
  const markUp = photoCard(data);
  refs.galleryDiv.insertAdjacentHTML('beforeend', markUp);
  return markUp;
}

export default markupList;
