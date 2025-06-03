import Remote from "../../data/remote/remote.js";
import generateTemplateStory from "../../template/story-template.js";
import HomePresenter from "./home-presenter.js";

export default class HomePage {
  #presenter;
  #isLoading = false;

  async render() {
    this.setPage(0);
    this.setIsEnd(false);

    return `
    <header class="main__header">
      <h1 class="title">Beranda</h1>
      <nav class="nav__action">
        <a id="add-story-btn" class="btn__primary">+ Tambah Cerita</a>
        <a id="logout-btn" class="btn__secondary nav-a">Keluar</a>
      </nav>
    </header>
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

    document.getElementById('logout-btn').addEventListener('click', (e) => {
      localStorage.removeItem('credentials');
      window.location.href = '/';
    });

    document.getElementById('add-story-btn').addEventListener('click', () => {
      window.location.href = '#/add';
    });

    window.addEventListener("scroll", async () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (this.getIsEnd()) {
        return
      }

      if (nearBottom && !this.#isLoading) {
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