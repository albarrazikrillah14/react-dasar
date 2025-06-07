import { showFormattedDate } from "../utils";

export default function generateTemplateStory({
  id,
  name,
  description,
  photoUrl,
  createdAt,
}) {
  return `
    <div class="story__card" data-id="${id}" onclick="window.location.href='#/stories/${id}'">
      <img src="${photoUrl}" alt="${name}" class="story__card__image" />
      <div class="story__card__content">
        <h2 class="story__card__title">${name}</h2>
        <p class="story__card__description">  ${description.split(' ').slice(0, 10).join(' ')}...</p>
        <time class="story__card__date">${showFormattedDate(createdAt)}</time>
      </div>
    </div>
  `;
}
