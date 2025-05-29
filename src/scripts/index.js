import '../styles/styles.css';
import './note-list.js';
import './note.js';
import './add-note.js';
import './note-status.js';
import { NoteService } from './service.js';

let archiveStatus = "unarchive";

const addNote = async (body) => {
  showLoading();
  try {
    await NoteService.createNote(body);
  } catch (error) {
    showError(error);
  } finally {
    hideLoading();
    setView();
  }
};

async function getNoteList(archive) {
  showLoading();
  try {
    const notes = await NoteService.getAllNotes(archive);
    return notes;
  } catch (error) {
    showError(error);
    return [];
  } finally {
    hideLoading();
  }
}

async function deleteNotById(id) {
  showLoading();
  try {
    await NoteService.deleteNoteById(id);
  } catch (error) {
    showError(error);
  } finally {
    hideLoading();
    setView();
  }
}

async function updateArchiveStatus(id, status) {
  showLoading();
  try {
    await NoteService.editArchiveStatusById(id, status);
  } catch (error) {
    showError(error);
  } finally {
    hideLoading();
    setView();
  }
}

function showLoading() {
  if (document.getElementById('loading-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'loading-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.pointerEvents = 'auto';

  const loading = document.createElement('p');
  loading.id = 'loading-indicator';
  loading.textContent = 'Loading...';
  loading.style.textAlign = 'center';
  loading.style.fontSize = '1.5rem';
  loading.style.color = '#2563eb';
  loading.style.background = 'white';
  loading.style.padding = '1rem 2rem';
  loading.style.borderRadius = '8px';
  loading.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';

  overlay.appendChild(loading);
  document.body.appendChild(overlay);
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}

function showError(message) {
  const existing = document.getElementById('error-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'error-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.pointerEvents = 'auto';

  const box = document.createElement('div');
  box.style.background = 'white';
  box.style.padding = '2rem';
  box.style.borderRadius = '8px';
  box.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
  box.style.textAlign = 'center';
  box.style.minWidth = '200px';
  box.style.maxWidth = '90%';

  const errorMsg = document.createElement('p');
  errorMsg.id = 'error-message';
  errorMsg.textContent = message.message || message.toString();
  errorMsg.style.fontSize = '1.2rem';
  errorMsg.style.color = '#dc2626';
  errorMsg.style.marginBottom = '1rem';

  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.style.padding = '0.5rem 1rem';
  okButton.style.fontSize = '1rem';
  okButton.style.border = 'none';
  okButton.style.borderRadius = '4px';
  okButton.style.backgroundColor = '#3b82f6';
  okButton.style.color = 'white';
  okButton.style.cursor = 'pointer';
  okButton.style.width = '100%';
  okButton.style.marginTop = '1rem';

  okButton.onclick = () => {
    overlay.remove();
  };

  box.appendChild(errorMsg);
  box.appendChild(okButton);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

const setAddNoteView = () => {
  const existingAdd = document.getElementById('add-note');
  if (existingAdd) existingAdd.remove();

  const addNoteView = document.createElement('add-note');
  addNoteView.set(addNote);
  document.body.appendChild(addNoteView);
}

const setNoteListView = (list) => {
  const existingNoteList = document.getElementById('note-list');
  if (existingNoteList) existingNoteList.remove();

  const noteList = document.createElement('note-list');
  noteList.set({ list: list, onDelete: deleteNotById, onUpdate: updateArchiveStatus });
  document.body.append(noteList);
}

const setNoteStatusView = () => {
  const existingNoteStatus = document.getElementById('note-status');
  if (existingNoteStatus) existingNoteStatus.remove();

  const noteStatus = document.createElement('note-status');
  noteStatus.set(archiveStatus, (status) => {
    archiveStatus = status;
    setView();
  })

  document.body.append(noteStatus);
}

const setView = async () => {
  document.body.innerHTML = '';
  setAddNoteView();

  setNoteStatusView();

  const notes = await getNoteList(archiveStatus);
  setNoteListView(notes);
};

await setView();