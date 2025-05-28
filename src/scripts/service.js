const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export class NoteService {
  static async getAllNotes(isArchived) {
    return fetch(
      `${BASE_URL}/notes${isArchived ? '/archived' : ''}`).then((response) => {
        return response.json();
      }).then((response) => {
        return response.data;
      }).catch((error) => {
        return error.toString();
      })
  }

  static async deleteNoteById(id) {
    return fetch(
      `${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      return response.json();
    }).then((response) => {
      return response.message;
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
      return response.json();
    }).then((response) => {
      return response.message;
    }).catch((error) => {
      return error.toString();
    })
  }

  static async getNoteById(id) {
    return fetch(
      `${BASE_URL}/notes/${id}`,
    ).then((response) => {
      return response.data;
    }).catch((error) => {
      return error.toString();
    })
  }

  static async editArchiveStatusById(id, archive) {
    return fetch(
      `${BASE_URL}/notes/${id}/${archive ? 'unarchive' : 'archive'}`, {
      method: 'POST'
    }).then((response) => {
      return response.json();
    }).then((response) => {
      return response.message;
    }).catch((error) => {
      return error.toString();
    })
  }
}