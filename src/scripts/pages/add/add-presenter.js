export default class AddPresenter {
  #model;
  #view;
  #mediaStream;
  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
    this.#mediaStream = null;

  }

  async postStory({ description, photo, lat, lon }) {
    try {
      await this.#view.showLoading();
      await this.#model.postStory({ description, photo, lat, lon });
      await this.#view.handleSuccess();
    } catch (error) {
      await this.#view.handleError(error.message);
    } finally {
      await this.#view.hideLoading();
    }
  }

   async initializeCamera() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.#view.handleError('Kamera tidak didukung oleh browser ini.');
        return;
      }
      this.#mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      this.#view.setCameraStream(this.#mediaStream);
    } catch (error) {
      console.error('Error Accessing camera: ', error);
      let message = 'Akses kamera ditolak atau kamera tidak ditemukan.';
      if (
        error.name === 'NotFoundError' ||
        error.name === 'DevicesNotFoundError'
      ) {
        message = 'Tidak ada kamera yang ditemukan.';
      } else if (
        error.name === 'NotAllowedError' ||
        error.name === 'PermissionDeniedError'
      ) {
        message =
          'Akses ke kamera tidak diizinkan. Periksa pengaturan browser Anda.';
      }
      this.#view.handleError(message);
      this.#stopMediaStream();
    }
  }

  capturePhoto() {
    if (!this.#mediaStream || !this.#mediaStream.active) {
      this.#view.handleError(
        'Stream kamera tidak aktif untuk mengambil foto.'
      );
      return null;
    }
    return this.#view.captureCameraFrame();
  }

  #stopMediaStream() {
    if (this.#mediaStream) {
      this.#mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      this.#mediaStream = null;
    }
  }

  handleFileInput(file) {
    if (file) {
      this.#stopMediaStream();
    }
  }

  destroy() {
    this.#stopMediaStream();
  }
}