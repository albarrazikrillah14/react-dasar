export default class AddPresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async postStory({ description, photo, lat, lon }) {
    try {
      await this.#view.showLoading();
      await this.#model.postStory({ description, photo, lat, lon });
      await this.#view.handleSuccess();
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }
}