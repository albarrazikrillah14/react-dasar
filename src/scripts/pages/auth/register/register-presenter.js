export default class RegisterPresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async register({ name, email, password }) {
    try {
      await this.#view.showLoading();
      await this.#model.register(name, email, password);
      await this.#view.handleRegisterSuccess();
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }
}