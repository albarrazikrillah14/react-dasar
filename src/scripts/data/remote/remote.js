import { BASE_URL } from "../../config.js";
import { getAccessToken } from "../../utils/auth.js";

const Remote = {
  async register(name, email, password) {
    try {
      const result = await fetch(
        `${BASE_URL}/register`, {
        headers: {
          'Content-Type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        })
      })


      const response = await result.json();

      if (result.status >= 200 && result.status < 300) {
        const { message } = response;
        return message;
      }

      throw new Error(response.message);

    } catch (error) {
      throw new Error(error.message);
    }
  },

  async login(email, password) {
    try {
      const result = await fetch(
        `${BASE_URL}/login`, {
        headers: {
          'Content-Type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        })
      })


      const response = await result.json();

      if (result.status >= 200 && result.status < 300) {
        const { loginResult } = response;
        return loginResult;
      }

      throw new Error(response.message);

    } catch (error) {
      throw new Error(error.message);
    }
  },
  async postStory({ description, photo, lat, lon }) {
    const token = getAccessToken()


    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photo);

      if (lat) formData.append("lat", lat);
      if (lon) formData.append("lon", lon);

      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const result = await fetch(
        `${BASE_URL}/stories${token ? "" : "/guest"}`, {
        headers: headers,
        method: "POST",
        body: formData,
      })


      const response = await result.json();

      if (result.status >= 200 && result.status < 300) {
        const { message } = response;
        return message;
      }

      if (result.status === 401) {
        localStorage.removeItem("credentials");
      }

      throw new Error(response.message);

    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getAllStories({page = 0, size = 10, location = 1}) {
    const token = getAccessToken()

    try {
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      let query = [];
      if (page) query.push(`page=${page}`);
      if (size) query.push(`size=${size}`);
      if (location) query.push(`location=${location}`);

      let url = `${BASE_URL}/stories`;
      if (query.length) {
        url += `?${query.join("&")}`
      }

      const result = await fetch(
        url, {
        headers: headers,
      })


      const response = await result.json();

      if (result.status >= 200 && result.status < 300) {
        const { listStory } = response;
        return listStory;
      }

      if (result.status === 401) {
        localStorage.removeItem("credentials");
      }

      throw new Error(response.message);

    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getDetailStoryById(id) {
    const token = getAccessToken();

    try {
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      let url = `${BASE_URL}/stories/${id}`;

      const result = await fetch(
        url, {
        headers: headers,
      })


      const response = await result.json();

      if (result.status >= 200 && result.status < 300) {
        const { story } = response;
        return story;
      }

      if (result.status === 401) {
        localStorage.removeItem("credentials");
      }

      throw new Error(response.message);

    } catch (error) {
      throw new Error(error.message);
    }
  },
 async getLocationName(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await response.json();

    const address = data.address;
    const locationName = address.city || address.town || address.village ||
      address.county || address.state || 'Lokasi tidak diketahui';

    return locationName;
  } catch {
    return '';
  }
}

};

export default Remote;