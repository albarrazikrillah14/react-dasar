import Remote from "../../data/remote/remote.js";
import { parseActivePathname } from "../../routes/url-parser.js";
import { showFormattedDate } from "../../utils/index.js";
import DetailPresenter from "./detail-presenter.js";

export default class DetailPage {
  #map;
  #storiesLayer;
  #presenter;

  async render() {
    return `
      <h1 class="title">Detail Story</h1>
      <div id="loading__container"></div>
      <div id="story-detail"></div>
      <p class="cta"><a href="#/home">Kembali ke Home</a></p>
    `;
  }

  async afterRender() {
    const { id } = parseActivePathname();

    this.#presenter = new DetailPresenter(id, {
      model: Remote,
      view: this,
    });

    await this.#presenter.showDetail();
  }

  async showDetail({ id, name, description, photoUrl, createdAt, lat, lon }) {
    const isMapExist = lat && lon;

    document.getElementById('story-detail').innerHTML = `
      <div class="detail__card">
        <img src="${photoUrl}" alt="${name}" class="detail__image" />
        <div class="detail__info">
          <h2 class="detail__name">${name}</h2>
          <p class="detail__date">📅 ${showFormattedDate(createdAt)}</p>
          <p class="detail__description">${description}</p>
          ${isMapExist ? `
            <p class="detail__location">Lokasi: ${lat} ${lon}</p>
            <div id="map-container" class="map"></div>
          ` : ""}
        </div>
      </div>
    `;

    if (isMapExist) {
      await this.showMap({ id, name, description, photoUrl, createdAt, lat, lon });
    }
  }

  async showMap(detail) {
    const mapContainer = document.getElementById("map-container");

    if (!mapContainer) return;

    if (this.#map) {
      this.#map.remove();
    }

    try {
      this.#map = L.map('map-container').setView([detail.lat, detail.lon], 13);

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

      this.#storiesLayer = L.featureGroup();

      const overlayLayers = {
        'Lokasi Cerita': this.#storiesLayer,
      };

      L.control.layers(baseLayers, overlayLayers).addTo(this.#map);
      osmStandard.addTo(this.#map);
      this.#storiesLayer.addTo(this.#map);
      this.#map.invalidateSize();

      await this.showMarker(detail);

    } catch {
      mapContainer.innerHTML = `<p class="error__message">Map tidak dapat dimuat</p>`;
    }
  }

  async showMarker({ name, description, photoUrl, lat, lon, createdAt }) {
    if (!this.#map || !this.#storiesLayer || !lat || !lon) return;

    this.#storiesLayer.clearLayers(); // <- pindahkan ke sini

    const marker = L.marker([lat, lon]);

    let popupContent = `<b>${name || 'Tanpa Nama'}</b>`;
    if (description) {
      const shortDescription =
        description.substring(0, 10) + (description.length > 20 ? '...' : '');
      popupContent += `<br>${shortDescription}`;
    }
    if (photoUrl) {
      popupContent += `<br><img src="${photoUrl}" alt="Gambar story ${name}" aria-label="Lokasi cerita: Nama lokasi" class="image__popup">`;
    }
    if (createdAt) {
      popupContent += `<br><small>${showFormattedDate(createdAt)}</small>`;
    }

    marker.bindPopup(popupContent);
    marker.addTo(this.#storiesLayer);
  }

  async handleError(error) {
    const container = document.getElementById('story-detail');
    if (container) {
      container.innerHTML = `<p class="error__message">${error}</p>`;
    }
  }

  async showLoading() {
    document.getElementById('loading__container').innerHTML = `
      <div class="loader"></div>
    `;
  }

  async hideLoading() {
    document.getElementById('loading__container').innerHTML = '';
  }
}
