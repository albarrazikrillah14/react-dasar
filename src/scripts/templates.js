import { showFormattedDate } from "./utils";

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

export function generateMainNavigationListTemplate() {
  return `
    <li><a id="report-list-button" class="report-list-button" href="#/">Daftar Cerita</a></li>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="new-report-button" class="btn new-report-button" href="#/add">Buat Cerita <i class="fas fa-plus"></i></a></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}