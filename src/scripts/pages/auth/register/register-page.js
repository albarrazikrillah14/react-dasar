import Remote from "../../../data/remote/remote.js";
import RegisterPresenter from "./register-presenter.js";

export default class RegisterPage {
  #presenter;

  async render() {
    return `
      <form class="form__register">
        <h1 class="title">Halo! Yuk, daftar dulu</h1>
        <div class="form__group">
          <label for="name" class="form__group__label">Nama</label>
          <input type="text" id="name" name="name" required aria-describedby="additional_name_information"
            placeholder="masukkan name anda..">
          <p id="additional_name_information" class="error__message"></p>
        </div>
        <div class="form__group">
          <label for="email" class="form__group__label">Email</label>
          <input type="email" id="email" name="email" required aria-describedby="additional_email_information"
            placeholder="masukkan email anda..">
          <p id="additional_email_information" class="error__message"></p>
        </div>

        <div class="form__group">
          <label for="password" class="form__group__label">Password</label>
          <input type="password" id="password" name="password" required minlength="8"
            aria-describedby="additional_password_information" placeholder="masukkan password anda...">
          <p id="additional_password_information" class="error__message"></p>
        </div>

        <div <div id="loading__container"></div>
        <div id="error" class="error__message"></div>
        <button type="submit" class="btn__primary">Daftar</button>
        </div>

        <p class="cta">
          Sudah punya akun?
          <a href="#/login">Masuk</a>
        </p>
      </form>
    `;
  }

  async afterRender() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');


    //NAME VALIDATION 
    name.addEventListener('invalid', this.handleName);
    name.addEventListener('change', this.handleName);

    // EMAIL VALIDATION
    email.addEventListener('invalid', this.handleEmail);
    email.addEventListener('change', this.handleEmail);

    // PASSWORD VALIDATION
    password.addEventListener('invalid', this.handlePassword);
    password.addEventListener('change', this.handlePassword);

    this.#presenter = new RegisterPresenter({
      model: Remote,
      view: this,
    });


    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameValue = name.value;
      const emailValue = email.value;
      const passwordValue = password.value;

      await this.#presenter.register({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      });
    });
  }

  async handleRegisterSuccess() {
    window.location.href = '#/login';
  }

  async showLoading() {
    document.getElementById('error').innerHTML = '';
    document.querySelector('button[type="submit"]').disabled = true;
    document.getElementById('loading__container').innerHTML = `
      <div class="loader"></div>
    `;
  }

  async hideLoading() {
    document.querySelector('button[type="submit"]').disabled = false;
    document.getElementById('loading__container').innerHTML = '';
  }

  async handleError(error) {
    document.getElementById('error').innerHTML = `
      <p class="error__message">${error}</p>
    `;
  }

  async handleName(e) {
    const nameError = document.getElementById('additional_name_information');

    if (e.target.validity.valid) {
      nameError.textContent = '';
      e.target.setCustomValidity('');
    }

    if (e.target.validity.valueMissing) {
      nameError.textContent = 'nama tidak boleh kosong.';
      e.target.setCustomValidity('Nama tidak boleh kosong');
    } else {
      nameError.textContent = '';
      e.target.setCustomValidity('');
    }
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