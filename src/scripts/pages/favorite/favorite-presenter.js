export default class FavoritePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

   async showAll() {
    try {
      await this.#view.showLoading();
      const stories = await this.#model.findAll();
      await this.#view.showAllStories(stories);
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }
}