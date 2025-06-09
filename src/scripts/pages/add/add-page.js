import Remote from "../../data/remote/remote.js";
import AddPresenter from "./add-presenter.js";

export default class AddPage {
  #presenter;
  #map;
  #mapLayer;
  #currentMarker;
  #videoElement;
  #photoCanvasElement;
  #isSubmitting = false;
  #formSubmitHandler = null; 

  async render() {
    this.#isSubmitting = false; 

    return `
      <form class="form__add">
        <div class="form__group">
          <label for="image" class="form__group__label">Gambar</label>
          <div class="camera__container" style="margin-top: 1rem; display: flex; flex-direction: column; align-items: center;">
            <img id="imagePreview" src="" alt="Preview Gambar" style="max-width: 100%; margin-top: 1rem; display: none;">
            <video id="cameraView" autoplay playsinline style="max-width: 100%; display: none;"></video>
            <canvas id="photoCanvas" style="max-width: 100%; display: none;"></canvas>
            <div class="camera__controls" style="display: flex; gap: 0.5rem; margin-top: 1rem;">
              <button type="button" id="start-camera" class="btn__secondary">Buka Kamera</button>
              <button type="button" id="capture-photo" class="btn__secondary" style="display: none;">Ambil Foto</button>
              <button type="button" id="stop-camera" class="btn__secondary" style="display: none;">Tutup Kamera</button>
            </div>
          </div>
          <p class="subtitle">atau</p>
          <input type="file" id="image" name="image" accept="image/*" required>
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
            <div id="map-container" class="form__add__location__map"></div>
            </div>
            <div class="form__add_lat_lon">
              <label for="lat">Latitude:</label>
              <input type="number" name="latitude" value="0" id="lat" step="any" placeholder="Latitude">
              <label for="lon">Longitude:</label>
              <input type="number" name="longitude" value="0" id="lon" step="any" placeholder="Longitude">
              <button type="button" id="get-current-location" class="btn__secondary">Gunakan Lokasi Saat Ini</button>
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
    const lat = document.getElementById('lat');
    const lon = document.getElementById('lon');
    const getCurrentLocationBtn = document.getElementById('get-current-location');
    const startCameraBtn = document.getElementById('start-camera');
    const capturePhotoBtn = document.getElementById('capture-photo');
    const stopCameraBtn = document.getElementById('stop-camera');
    const imageInput = document.getElementById('image');

    this.#videoElement = document.getElementById('cameraView');
    this.#photoCanvasElement = document.getElementById('photoCanvas');

    description.addEventListener('change', this.handleDescription);
    description.addEventListener('invalid', this.handleDescription);

    lat.addEventListener('input', this.handleLatLonChange.bind(this));
    lon.addEventListener('input', this.handleLatLonChange.bind(this));

  
    getCurrentLocationBtn.addEventListener('click', this.getCurrentLocation.bind(this));

    startCameraBtn.addEventListener('click', this.startCamera.bind(this));
    capturePhotoBtn.addEventListener('click', this.capturePhoto.bind(this));
    stopCameraBtn.addEventListener('click', this.stopCamera.bind(this));

    imageInput.addEventListener('change', this.handleFileSelect.bind(this));

    await this.showMap();

    await this.getCurrentLocation();

    this.#presenter = new AddPresenter({
      model: Remote,
      view: this,
    });
    
    // Remove existing listener if any and add new one
    const form = document.querySelector('form');
    if (this.#formSubmitHandler) {
      form.removeEventListener('submit', this.#formSubmitHandler);
    }
    
    this.#formSubmitHandler = this.handleFormSubmit.bind(this);
    form.addEventListener('submit', this.#formSubmitHandler, { once: false });
  }

  async handleFormSubmit(e) {
    // Prevent default and stop propagation immediately
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    
    // Check if already submitting
    if (this.#isSubmitting) {
      console.log('Already submitting, ignoring duplicate submission');
      return;
    }

    const btn = document.getElementById('btn-submit');

    try {
      // Set submitting flag immediately
      this.#isSubmitting = true;
      
      // Disable button immediately
      btn.disabled = true;
      btn.textContent = 'Mengirim...'; // Visual feedback

      const form = document.querySelector('form');
      const formData = new FormData(form);
      const imageFile = formData.get('image');
      const description = formData.get('description');
      const lat = formData.get('latitude');
      const lon = formData.get('longitude');

      const latValue = parseFloat(lat);
      const lonValue = parseFloat(lon);

      if (!imageFile || imageFile.size === 0) {
        throw new Error('Gambar harus dipilih');
      }

      if (!description || description.length < 8) {
        throw new Error('Deskripsi minimal 8 karakter');
      }

      if (isNaN(latValue) || isNaN(lonValue)) {
        throw new Error('Koordinat lokasi tidak valid');
      }

      await this.#presenter.postStory({
        description: description,
        photo: imageFile,
        lat: latValue,
        lon: lonValue,
      });

    } catch (error) {
      this.handleError(error);
    } finally {
      // Reset states
      this.#isSubmitting = false;
      btn.disabled = false;
      btn.textContent = 'Tambah'; // Reset button text
    }
  }

  async startCamera() {
    try {
      this.clearImageDisplays();
      this.clearFileInput();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      this.setCameraStream(stream);

      // Show/hide buttons and elements
      document.getElementById('start-camera').style.display = 'none';
      document.getElementById('capture-photo').style.display = 'inline-block';
      document.getElementById('stop-camera').style.display = 'inline-block';
      this.#videoElement.style.display = 'block';

      // Tambahkan class active ke container
      const cameraContainer = document.querySelector('.camera__container');
      cameraContainer.classList.add('active');

    } catch (error) {
      console.error('Error accessing camera:', error);
      document.getElementById('error').innerHTML = `
        <p class="error__message">Tidak dapat mengakses kamera: ${error.message}</p>
      `;
    }
  }

  async stopCamera() {
    if (this.#videoElement && this.#videoElement.srcObject) {
      const stream = this.#videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.#videoElement.srcObject = null;
    }

    // Show/hide buttons and elements
    document.getElementById('start-camera').style.display = 'inline-block';
    document.getElementById('capture-photo').style.display = 'none';
    document.getElementById('stop-camera').style.display = 'none';
    this.#videoElement.style.display = 'none';
    this.#photoCanvasElement.style.display = 'none';

    // Hapus class active dari container
    const cameraContainer = document.querySelector('.camera__container');
    cameraContainer.classList.remove('active');
  }

  clearImageDisplays() {
    // Hide canvas display
    this.#photoCanvasElement.style.display = 'none';

    // Clear canvas content
    const context = this.#photoCanvasElement.getContext('2d');
    context.clearRect(0, 0, this.#photoCanvasElement.width, this.#photoCanvasElement.height);

    // Hide image preview
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.style.display = 'none';
    imagePreview.src = '';
  }

  clearFileInput() {
    // Clear the file input
    const imageInput = document.getElementById('image');
    imageInput.value = '';
  }

  async capturePhoto() {
    try {
      const dataUrl = this.captureCameraFrame();

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create file from blob
      const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });

      // Create file list and assign to input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      document.getElementById('image').files = dataTransfer.files;

      // Clear previous displays
      this.clearImageDisplays();

      // Show preview
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = dataUrl;
      imagePreview.style.display = 'block';

      // Stop camera
      await this.stopCamera();

    } catch (error) {
      console.error('Error capturing photo:', error);
      document.getElementById('error').innerHTML = `
        <p class="error__message">Gagal mengambil foto: ${error.message}</p>
      `;
    }
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    const imagePreview = document.getElementById('imagePreview');

    // Clear previous displays
    this.clearImageDisplays();

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  setCameraStream(stream) {
    this.#videoElement.srcObject = stream;
    this.#videoElement.addEventListener('loadedmetadata', () => {
      this.#videoElement.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    });
  }

  captureCameraFrame() {
    const context = this.#photoCanvasElement.getContext('2d');
    const maxWidth = 640;
    const maxHeight = 480;
    let width = this.#videoElement.videoWidth;
    let height = this.#videoElement.videoHeight;

    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
    this.#photoCanvasElement.width = width;
    this.#photoCanvasElement.height = height;
    context.drawImage(this.#videoElement, 0, 0, width, height);
    return this.#photoCanvasElement.toDataURL('image/jpeg', 0.8);
  }

  async getCurrentLocation() {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            document.getElementById('lat').value = lat.toFixed(6);
            document.getElementById('lon').value = lon.toFixed(6);

            if (this.#map) {
              this.updateMapLocation(lat, lon);
            }

            resolve();
          },
          (error) => {
            console.warn('Tidak dapat mengakses lokasi:', error.message);
            // Fallback ke lokasi default (Jakarta)
            document.getElementById('lat').value = -6.2088;
            document.getElementById('lon').value = 106.8456;

            if (this.#map) {
              this.updateMapLocation(-6.2088, 106.8456);
            }

            resolve();
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      } else {
        console.warn('Geolocation tidak didukung browser');
        // Fallback ke lokasi default (Jakarta)
        document.getElementById('lat').value = -6.2088;
        document.getElementById('lon').value = 106.8456;

        if (this.#map) {
          this.updateMapLocation(-6.2088, 106.8456);
        }

        resolve();
      }
    });
  }

  handleLatLonChange() {
    const latInput = document.getElementById('lat');
    const lonInput = document.getElementById('lon');

    const lat = parseFloat(latInput.value);
    const lon = parseFloat(lonInput.value);

    if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      this.updateMapLocation(lat, lon);
    }
  }

  updateMapLocation(lat, lon) {
    if (!this.#map || !this.#mapLayer) return;

    if (this.#currentMarker) {
      this.#mapLayer.removeLayer(this.#currentMarker);
    }

    //  marker baru
    this.#currentMarker = L.marker([lat, lon], {
      draggable: true
    }).addTo(this.#mapLayer);

    this.#currentMarker.on('dragend', (e) => {
      const position = e.target.getLatLng();
      document.getElementById('lat').value = position.lat.toFixed(6);
      document.getElementById('lon').value = position.lng.toFixed(6);
    });

    this.#map.setView([lat, lon], this.#map.getZoom());
  }

  async showMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    if (this.#map) {
      this.#map.remove();
    }

    try {
      const latInput = document.getElementById('lat');
      const lonInput = document.getElementById('lon');

      const lat = parseFloat(latInput?.value) || -6.2088;
      const lon = parseFloat(lonInput?.value) || 106.8456;

      this.#map = L.map('map-container').setView([lat, lon], 13);

      const osmStandard = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      const openTopoMap = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
        }
      );

      const cartoDbPositron = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        }
      );

      const cartoDbDarkMatter = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        }
      );

      const baseLayers = {
        'OpenStreetMap Standard': osmStandard,
        'OpenTopoMap': openTopoMap,
        'Carto DB Positron': cartoDbPositron,
        'Carto DB Dark Matter': cartoDbDarkMatter,
      };

      this.#mapLayer = L.featureGroup();

      const overlayLayers = {
        'Lokasi Cerita': this.#mapLayer,
      };

      L.control.layers(baseLayers, overlayLayers).addTo(this.#map);
      osmStandard.addTo(this.#map);
      this.#mapLayer.addTo(this.#map);

      // Event listener untuk klik pada peta
      this.#map.on('click', (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        // Update input fields
        document.getElementById('lat').value = lat.toFixed(6);
        document.getElementById('lon').value = lon.toFixed(6);

        // Update marker
        this.updateMapLocation(lat, lon);
      });

      // Tambah marker awal
      this.updateMapLocation(lat, lon);

      this.#map.invalidateSize();

    } catch (error) {
      console.error('Error loading map:', error);
      mapContainer.innerHTML = `<p class="error__message">Map tidak dapat dimuat</p>`;
    }
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