import Remote from "../../../data/remote/remote.js";
import LoginPresenter from "./login-presenter.js";

export default class LoginPage {
  #presenter;

  render() {
    return `
      <form class="form__login">
        <h1 class="title">Selamat Datang</h1>

        <div class="form__group">
          <label for="email" class="form__group__label">Email</label>
          <input type="email" id="email" name="email" required placeholder="masukkan email anda..">
          <p id="additional_email_information" class="error__message"></p>
        </div>

        <div class="form__group">
          <label for="password" class="form__group__label">Password</label>
          <input type="password" id="password" name="password" required minlength="8"
            placeholder="masukkan password anda...">
          <p id="additional_password_information" class="error__message"></p>
        </div>

        <div id="loading__container"></div>
        <div id="error" class="error__message"></div>
        <button type="submit" class="btn__primary" id="btn-login">Masuk</button>
        <p class="cta">
          Belum punya akun?
          <a href="#/register">Daftar</a>
        </p>
      </form>
    `;
  }

  async afterRender() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // EMAIL VALIDATION
    email.addEventListener('invalid', this.handleEmail);
    email.addEventListener('change', this.handleEmail);

    // PASSWORD VALIDATION
    password.addEventListener('invalid', this.handlePassword);
    password.addEventListener('change', this.handlePassword);

    this.#presenter = new LoginPresenter({
      model: Remote,
      view: this,
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailValue = email.value;
      const passwordValue = password.value;

      await this.#presenter.login({
        email: emailValue,
        password: passwordValue,
      });
    });
  }

  async handleLoginSuccess() {
    window.location.href = '#/';
  }

  async showLoading() {
    document.getElementById('error').innerHTML = '';
    document.getElementById('btn-login').disabled = true;
    document.getElementById('loading__container').innerHTML = `
      <div class="loader"></div>
    `;
  }

  async hideLoading() {
    document.getElementById('btn-login').disabled = false;
    document.getElementById('loading__container').innerHTML = '';
  }

  async handleError(error) {
    document.getElementById('error').innerHTML = `
      <p class="error__message">${error}</p>
    `;
  }

  async handleEmail(e) {
    const emailError = document.getElementById('additional_email_information');

    if (e.target.validity.valid) {
      emailError.textContent = '';
      e.target.setCustomValidity('');
    }

    if (e.target.validity.valueMissing) {
      emailError.textContent = 'Email tidak boleh kosong.';
      e.target.setCustomValidity('Email tidak boleh kosong');

    } else if (e.target.validity.typeMismatch) {
      emailError.textContent = 'Format email tidak valid.';
      e.target.setCustomValidity('Format email tidak valid.');

    } else {
      emailError.textContent = '';
      e.target.setCustomValidity('');
    }
  }

  async handlePassword(e) {
    const passwordError = document.getElementById('additional_password_information');

    if (e.target.validity.valid) {
      passwordError.textContent = '';
      e.target.setCustomValidity('');

    }

    if (e.target.validity.valueMissing) {
      passwordError.textContent = 'Password tidak boleh kosong.';
      e.target.setCustomValidity('Password tidak boleh kosong');

    } else if (e.target.validity.tooShort) {
      passwordError.textContent = 'Password minimal 8 karakter.';
      e.target.setCustomValidity('Password minimal 8 karakter.');
    } else {
      passwordError.textContent = '';
      e.target.setCustomValidity('');
    }
  }
}
