export default class HomePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async showAllStories() {
    try {
      const page = parseInt(this.#view.getPage());

      await this.#view.showLoading();
      const stories = await this.#model.getAllStories({page: page + 1 });
      if (stories.length === 10) {
        this.#view.setPage(page + 1);
      }

      await this.#view.showAllStories(stories);
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }
}