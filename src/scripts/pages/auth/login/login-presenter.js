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
      const result = await this.#model.login(email, password);

      if (result) {
        localStorage.setItem("credentials", JSON.stringify(result));
        await this.#view.handleLoginSuccess();
      }

    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }
}