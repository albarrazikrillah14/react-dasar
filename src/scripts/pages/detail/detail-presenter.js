export default class DetailPresenter {
  #id;
  #model;
  #localModel;
  #view;

  constructor(id, { model, localModel, view }) {
    this.#id = id;
    this.#model = model;
    this.#localModel = localModel;
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

  async saveStory() {
    try {
      await this.#view.showLoading();

      const story = await this.#model.getDetailStoryById(this.#id);
      await this.#localModel.putStory(story);
      await this.renderSaveButton();
      this.#view.saveToBookmarkSuccessfully('Success to save to bookmark');

    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }

  async deleteStory() {
    try {
      await this.#view.showLoading();

      await this.#localModel.deleteById(this.#id);
      await this.renderSaveButton();
      this.#view.deleteFromBookmarkSuccessfully('Success to delete from bookmark');
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }

  async isSave() {
    const story = await this.#localModel.findById(this.#id);
    return story !== undefined;
  }

  async renderSaveButton() {
    const isSave = await this.isSave();
    await this.#view.renderSaveButton(isSave);
  }
}