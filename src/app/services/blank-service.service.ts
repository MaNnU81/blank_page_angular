import {Injectable } from '@angular/core';
import { type NoteInterface } from '../model/note-interface';

@Injectable({
  providedIn: 'root'
})


export class BlankServiceService  {
  
  private readonly STORAGE_KEY = 'notes';

  constructor() { }
  getAllNotes(): NoteInterface[] {
    const notesJson = localStorage.getItem(this.STORAGE_KEY);
    return notesJson ? JSON.parse(notesJson) : [];
  }

  saveNote(note: NoteInterface): void {
    // Recupera tutte le note esistenti
    const existingNotes = this.getAllNotes();
    
    // Controlla se la nota esiste già (per aggiornamento)
    const existingNoteIndex = existingNotes.findIndex(n => n.id === note.id);
    
    // Aggiorna last_edit
    note.last_edit = Date.now();
    
    if (existingNoteIndex >= 0) {
      // Sostituisce la nota esistente
      existingNotes[existingNoteIndex] = note;
    } else {
      // Aggiunge la nuova nota
      existingNotes.push(note);
    }
    
    // Salva l'array aggiornato nel localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingNotes));
  }

 
}