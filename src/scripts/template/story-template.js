export default function generateTemplateStory({
  id,
  name,
  description,
  photoUrl,
  createdAt,
}) {
  return `
    <div class="story-card" data-id="${id}" onclick="window.location.href='#/stories/${id}'">
      <img src="${photoUrl}" alt="${name}" class="story-card__image" />
      <div class="story-card__content">
        <h2 class="story-card__title">${name}</h2>
        <p class="story-card__description">${description}</p>
        <time class="story-card__date">${new Date(createdAt).toLocaleDateString()}</time>
      </div>
    </div>
  `;
}
