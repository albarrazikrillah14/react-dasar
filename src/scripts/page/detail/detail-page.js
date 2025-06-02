import Remote from "../../data/remote/remote.js";
import { parseActivePathname } from "../../routes/url-parser.js";
import DetailPresenter from "./detail-presenter.js";

export default class DetailPage {
  #presenter;
  async render() {

    return `
    <section class="detail-container">
      <h1 class="detail-title">Detail Story</h1>
      <div class="story-detail"></div>
    </section>
    `;
  }

  async afterRender() {
    const { id } = parseActivePathname();

    this.#presenter = new DetailPresenter(id, {
      model: Remote,
      view: this,
    })

    await this.#presenter.showDetail();
  }

  async showDetail({ id, name, description, photoUrl, createdAt, lat, lon }) {
    const container = document.querySelector('.story-detail');

    container.innerHTML = `
    <div class="detail-card">
      <img src="${photoUrl}" alt="${name}" class="detail-image" />
      <div class="detail-info">
        <h2 class="detail-name">${name}</h2>
        <p class="detail-date">📅 ${new Date(createdAt).toLocaleDateString()}</p>
        <p class="detail-description">${description}</p>
        <p class="detail-location">📍 ${lat}, ${lon}</p>
      </div>
    </div>
  `;
  }


}
