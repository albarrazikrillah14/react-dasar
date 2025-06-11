import Database from "../../data/local/database.js";
import generateTemplateStory from "../../templates.js";
import FavoritePresenter from "./favorite-presenter.js";

export default class FavoritePage {
  #presenter;

  async render() {
    return `
    <div id="loading__container"></div>
    <div class="stories"></div>
  `;
  }

  async afterRender() {
    this.#presenter = new FavoritePresenter({
      model: Database,
      view: this,
    })

    await this.#presenter.showAll();
  }

  async showAllStories(stories) {
    if (!stories || stories.length === 0) {
      document.querySelector('.stories').innerHTML =
        '<p class="error__message">Tidak ada Cerita Favorite</p>';
      return;
    }

    const html = stories.reduce((prev, current) => {
      return prev + generateTemplateStory(current);

    }, '');

    document.querySelector('.stories').innerHTML = `<ul class="story-list">${html}</ul>`;

  }

  async handleError(error) {
    const container = document.querySelector('.stories');
    if (container) {
      container.innerHTML = `<p class="error__message">${error}</p>`;
    }
  }

  async showLoading() {
    document.getElementById('loading__container').innerHTML = `
      <div class="loader"></div>
    `;
  }

  async hideLoading() {
    document.getElementById('loading__container').innerHTML = '';
  }

}