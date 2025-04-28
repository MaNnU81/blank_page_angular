import {Injectable } from '@angular/core';
import { type NoteInterface } from '../model/note-interface';

@Injectable({
  providedIn: 'root'
})
export class BlankServiceService {
  private readonly STORAGE_KEY = 'notes';

  getAllNotes(): NoteInterface[] {
    const notesJson = localStorage.getItem(this.STORAGE_KEY);
    return notesJson ? JSON.parse(notesJson) : [];
  }

  saveNote(note: NoteInterface): void {
    const notes = this.getAllNotes();
    const index = notes.findIndex(n => n.id === note.id);
    
    if (index >= 0) {
      notes[index] = note;
    } else {
      notes.unshift(note); // Aggiungi nuove note in cima
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
  }
}