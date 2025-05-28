import '../styles/styles.css';
import './note-list.js';
import './note.js';
import './add-note.js';
import './note-status.js';
import { NoteService } from './service.js';

function addNote(body) {
  setLoading();
  NoteService.createNote(body)
    .then(() => {
      setView();
    }).catch((error) => {
      setError(error)
    })
}

function getNoteList(archive) {
  return NoteService.getAllNotes(archive)
    .then((data) => {
      const noteList = document.createElement('note-list');
      noteList.set({ list: data, onDelete: deleteNotById, onUpdate: updateArchiveStatus });
      return noteList;
    }).catch((error) => {
      return setError(error)
    });
}


function deleteNotById(id) {
  setLoading();
  NoteService.deleteNoteById(id)
    .then(() => {
      setView();
    }).catch((error) => {
      setError(error)
    });
}

function updateArchiveStatus(id, status) {
  setLoading();
  NoteService.editArchiveStatusById(id, status)
    .then(() => {
      setView();
    }).catch((error) => {
      setError(error)
    })
}

function setLoading() {
  document.body.innerHTML = '';
  const loading = document.createElement('p');
  loading.id = 'loading-indicator';
  loading.textContent = 'Loading...';
  loading.style.textAlign = 'center';
  loading.style.fontSize = '1.2rem';
  loading.style.color = '#2563eb';
  loading.style.marginTop = '2rem';
  document.body.appendChild(loading);
}

function setError(error) {
  document.body.innerHTML = '';
  const errorMsg = document.createElement('p');
  errorMsg.id = 'error-message';
  errorMsg.textContent = `Error: ${error}`;
  errorMsg.style.textAlign = 'center';
  errorMsg.style.fontSize = '1.2rem';
  errorMsg.style.color = '#dc2626';
  errorMsg.style.marginTop = '2rem';
  document.body.appendChild(errorMsg);
}



function setView() {
  document.body.innerHTML = '';
  const addNoteView = document.createElement('add-note');
  addNoteView.set(addNote);
  document.body.appendChild(addNoteView);

  const noteStatus = document.createElement('note-status');
  noteStatus.onStatusSubmit((value) => {
    const noteList = document.querySelector('note-list');
    if (noteList) {
      noteList.remove();
    }
    getNoteList(value === "unarchive")
      .then((noteList) => {
        document.body.append(noteList);
      })
  })

  document.body.appendChild(noteStatus);

  getNoteList(false)
    .then((noteList) => {
      document.body.append(noteList);
    })
}



setView();