import { putAccessToken } from "../../../utils/auth";

export default class LoginPresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async login({ email, password }) {
    try {
      await this.#view.showLoading();
      await this.#model.login(email, password);
      await this.#view.handleLoginSuccess();
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }
}