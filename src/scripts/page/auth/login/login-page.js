import Remote from "../../../data/remote/remote.js";
import LoginPresenter from "./login-presenter.js";

export default class LoginPage {
  #presenter;

  render() {
    return `
      <form>
        <h1 class="title">Selamat Datang</h1>
        <div class="form-group">
          <label for="email" class="form-group__label">Email</label>
          <input type="email" id="email" name="email" required aria-describedby="additional_email_information"
            placeholder="masukkan email anda..">
          <p id="additional_email_information" class="error-message"></p>
        </div>

        <div class="form-group">
          <label for="password" class="form-group__label">Password</label>
          <input type="password" id="password" name="password" required minlength="8"
            aria-describedby="additional_password_information" placeholder="masukkan password anda...">
          <p id="additional_password_information" class="error-message"></p>
        </div>

        <div
          <div id="loading-container"></div>
          <div id="error" class="error-message"></div>
          <button type="submit" class="btn-primary">Masuk</button>
        </div>

        <p class="register-link">
          Belum punya akun?
          <a href="#/register">Daftar</a>
        </p>
      </form>
    `;
  }

  async afterRender() {
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
    window.location.href = '#/home';
  }

  async showLoading() {
    document.getElementById('error').innerHTML = '';
    document.querySelector('button[type="submit"]').hidden = true;
    document.getElementById('loading-container').innerHTML = `
      <div class="loader"></div>
    `;
  }

  async hideLoading() {
    document.querySelector('button[type="submit"]').hidden = false;
    document.getElementById('loading-container').innerHTML = '';
  }

  async handleError(error) {
    document.getElementById('error').innerHTML = `
      <p class="error">${error}</p>
    `;
  }

  async handleEmail(e) {
    e.preventDefault();

    const emailError = document.getElementById('additional_email_information');

    if (e.target.validity.valid) {
      emailError.textContent = '';
    }

    if (e.target.validity.valueMissing) {
      emailError.textContent = 'Email tidak boleh kosong.';
    } else if (e.target.validity.typeMismatch) {
      emailError.textContent = 'Format email tidak valid.';
    } else {
      emailError.textContent = '';
    }
  }

  async handlePassword(e) {
    e.preventDefault();
    const passwordError = document.getElementById('additional_password_information');

    if (e.target.validity.valid) {
      passwordError.textContent = '';
    }

    if (e.target.validity.valueMissing) {
      passwordError.textContent = 'Password tidak boleh kosong.';
    } else if (e.target.validity.tooShort) {
      passwordError.textContent = 'Password minimal 8 karakter.';
    }
  }
}
