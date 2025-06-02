import Remote from "../../data/remote/remote.js";
import { getQueryParamsFromHashObject } from "../../routes/url-parser.js";
import generateTemplateStory from "../../template/story-template.js";
import HomePresenter from "./home-presenter.js";

export default class HomePage {
  #presenter;
  async render() {
    return `
      <section class="home-page">
        <h1 class="home-page__title">Beranda</h1>
        <div id="stories"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      model: Remote,
      view: this,
    })

    await this.#presenter.showAllStories();
  }

  async showAllStories(stories) {
    const html = stories.reduce((prev, current) => {
      return prev + generateTemplateStory(current)
    }, '');

    document.getElementById('stories').innerHTML = `
      <ul class="story-list">${html}</ul>
    `;
  }

  async showError(error) {
    document.getElementById('stories').innerHTML = `<h1>${error}</h1>`;
  }
}