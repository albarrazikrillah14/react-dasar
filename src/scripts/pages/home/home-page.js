import Remote from "../../data/remote/remote.js";
import generateTemplateStory from "../../template/story-template.js";
import HomePresenter from "./home-presenter.js";

export default class HomePage {
  #presenter;
  #isLoading = false;

  async render() {
    this.setPage(0);

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

      if (nearBottom && !this.#isLoading) {
        this.#isLoading = true;
        await this.#presenter.showAllStories();
        this.#isLoading = false;
      }
    });

  }

  async showAllStories(stories) {
    const listStory = Array.from(document.querySelectorAll('.story-card'));

    const html = stories.reduce((prev, current) => {
      const alreadyExists = listStory.some(item => item.dataset.id === current.id);

      if (!alreadyExists) {
        return prev + generateTemplateStory(current);
      }
      return prev;
    }, '');

    const container = document.querySelector('.story-list');
    if (container) {
      container.insertAdjacentHTML('beforeend', html);
    } else {
      document.querySelector('.stories').innerHTML = `
      <ul class="story-list">${html}</ul>
    `;
    }
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
}