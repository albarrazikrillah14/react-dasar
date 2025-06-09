import Remote from "../../data/remote/remote.js";
import { getActiveRoute } from "../../routes/url-parser.js";
import generateTemplateStory from "../../templates.js";
import HomePresenter from "./home-presenter.js";

export default class HomePage {
  #presenter;
  #isLoading = false;

  async render() {
    this.setPage(0);
    this.setIsEnd(false);

    return `
    <div id="loading__container"></div>
    <div class="stories"></div>
  `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      model: Remote,
      view: this,
    })

    await this.#presenter.showAllStories();
    
    window.addEventListener("scroll", async () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (this.getIsEnd()) {
        return
      }
      
      if (nearBottom && !this.#isLoading) {
        if (getActiveRoute() !== "/") return;
        this.#isLoading = true;
        await this.#presenter.showAllStories();
        this.#isLoading = false;
      }
    });
  }

  async showAllStories(stories) {
    const container = document.querySelector('.story-list');
    if (!container) {
      document.querySelector('.stories').innerHTML = `<ul class="story-list"></ul>`;
    }

    const existingIds = new Set(Array.from(document.querySelectorAll('.story__card'))
      .map(el => el.dataset.id));

    const html = stories.reduce((prev, current) => {
      if (!existingIds.has(current.id)) {
        existingIds.add(current.id);
        return prev + generateTemplateStory(current);
      }
      return prev;
    }, '');

    document.querySelector('.story-list').insertAdjacentHTML('beforeend', html);
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

  setPage(page) {
    localStorage.setItem('page', page);
  }

  getPage() {
    return localStorage.getItem('page');
  }

  setIsEnd(isEnd) {
    localStorage.setItem('is_end', `${isEnd}`);
  }

  getIsEnd() {
    return localStorage.getItem('is_end') === "true";
  }
}