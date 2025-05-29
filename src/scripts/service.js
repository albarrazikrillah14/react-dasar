const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export class NoteService {
  static async getAllNotes(status) {
    return fetch(
      `${BASE_URL}/notes${status === "archive" ? '/archived' : ''}`).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        return Promise.reject("Something went wrong");
      }).then((response) => {
        const { data } = response;
        if (data.length === 0) {
          return Promise.reject("Data not found");
        }
        return Promise.resolve(data);

      }).catch((error) => {
        return error.toString();
      })
  }

  static async deleteNoteById(id) {
    return fetch(
      `${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return Promise.reject("Something went wrong");
    }).then((response) => {
      return Promise.resolve(response.message);
    }).catch((error) => {
      return error.toString();
    })
  }

  static async createNote({ title, body }) {
    return fetch(
      `${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body
      })
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    }).then((response) => {
      return Promise.resolve(response.message);
    }).catch((error) => {
      return Promise.reject(error.toString());
    })
  }

  static async getNoteById(id) {
    return fetch(
      `${BASE_URL}/notes/${id}`,
    ).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return Promise.reject("Something went wrong");
    }).then((response) => {
      if (!response.data) {
        return Promise.reject("Data not found");
      }
      return Promise.resolve(response.data);
    }).catch((error) => {
      return Promise.reject(error.toString());
    })
  }

  static async editArchiveStatusById(id, archive) {
    return fetch(
      `${BASE_URL}/notes/${id}/${archive ? 'unarchive' : 'archive'}`, {
      method: 'POST'
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return Promise.reject("Something went wrong");
    }).then((response) => {
      return Promise.resolve(response.message);
    }).catch((error) => {
      return Promise.reject(error.toString());
    })
  }
}