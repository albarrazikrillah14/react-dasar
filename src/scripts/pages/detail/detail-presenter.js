export default class DetailPresenter {
  #id;
  #model;
  #view;

  constructor(id, { model, view }) {
    this.#id = id;
    this.#model = model;
    this.#view = view;
  }

  async showDetail() {
    try {
      await this.#view.showLoading();

      const detail = await this.#model.getDetailStoryById(this.#id);

      await this.#view.showDetail(detail);
      
      const { lat, lon } = detail;
      if (lat && lon) {
        await this.#view.showMap(detail);
      }
      
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }

}