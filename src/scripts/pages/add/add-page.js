import Remote from "../../data/remote/remote.js";
import { convertBase64ToBlob } from "../../utils/index.js";
import AddPresenter from "./add-presenter.js";

export default class AddPage {
  #presenter;

  async render() {
    return `
      <section class="header">
        <h1 class="title">Tambah Ceritamu</h1>
        <p class="subtitle">Pastikan data yang anda masukkan valid</p>
      </section>
      <form class="form__add">
        <div class="form__group">
          <label for="image" class="form__group__label">Gambar</label>
          <input type="file" id="image" name="image" accept="image/*" required>
          <img id="imagePreview" src="" alt="Preview Gambar" style="max-width: 100%; margin-top: 1rem; display: none;">
        </div>
        <div class="form__group">
          <label for="description" class="form__group__label">Deskripsi</label>
          <input type="description" id="description" name="description" required minlength="8"
            placeholder="masukkan deskripsi anda...">
          <p id="additional_description_information" class="error__message"></p>
        </div>
        <div class="form__group">
          <label for="location" class="form__group__label">Lokasi</label>
          <div class="form__add__location__container">
            <div class="form__add__location__map__container">
            <div id="map" class="form__add__location__map"></div>
          </div>
          <div class="form__add_lat_lon">
            <input type="number" name="latitude" value="-6.175389">
            <input type="number" name="longitude" value="106.827139">
            </div>
          </div>
        </div>
        <div id="loading__container"></div>
        <div id="error" class="error__message"></div>
        <button type="submit" class="btn__primary" id="btn-submit">Tambah</button>
      </form>
    `;
  }

  async afterRender() {
    const description = document.getElementById('description');
    description.addEventListener('change', this.handleDescription);
    description.addEventListener('invalid', this.handleDescription);

    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file); // Convert to Base64 URL
      }
    });

    this.#presenter = new AddPresenter({
      model: Remote,
      view: this,
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const imageFile = formData.get('image');
      const descriptionValue = description.value;

      await this.#presenter.postStory({
        description: descriptionValue,
        photo: imageFile,
        lat: -6.175389,
        lon: 106.827139,
      });
    });

  }

  async handleSuccess() {
    window.location.href = '#/home';
  }

  async handleError(error) {
    document.getElementById('error').innerHTML = `
      <p class="error__message">${error}</p>
    `;
  }

  async showLoading() {
    document.getElementById('error').innerHTML = '';
    document.getElementById('btn-submit').disabled = true;
    document.getElementById('loading__container').innerHTML = `
      <div class="loader"></div>
    `;
  }

  async hideLoading() {
    document.getElementById('btn-submit').disabled = false;
    document.getElementById('loading__container').innerHTML = '';
  }

  async handleDescription(e) {
    const descriptionError = document.getElementById('additional_description_information');

    if (e.target.validity.valid) {
      descriptionError.textContent = '';
      e.target.setCustomValidity('');

    }

    if (e.target.validity.valueMissing) {
      descriptionError.textContent = 'Deskripsi tidak boleh kosong.';
      e.target.setCustomValidity('Deskripsi tidak boleh kosong');

    } else if (e.target.validity.tooShort) {
      descriptionError.textContent = 'Deskripsi minimal 8 karakter.';
      e.target.setCustomValidity('Deskripsi minimal 8 karakter.');
    } else {
      descriptionError.textContent = '';
      e.target.setCustomValidity('');
    }
  }
}
