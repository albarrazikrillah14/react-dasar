export default class HomePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async showAllStories() {
    try {
      const stories = await this.#model.getAllStories();
      await this.#view.showAllStories(stories);
    } catch (error) {
      await this.#view.showError(error.message);
    }
  }
}