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
      const detail = await this.#model.getDetailStoryById(this.#id);
      await this.#view.showDetail(detail);
    } catch (error) {
      console.log(error);
    } finally {}
  }
}