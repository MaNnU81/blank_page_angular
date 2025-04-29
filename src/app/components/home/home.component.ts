import { AfterViewInit, Component, ElementRef, EventEmitter, Input, input, OnInit, Output, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { BlankServiceService } from '../../services/blank-service.service';
import { NoteInterface } from '../../model/note-interface';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, MatListModule, MatIcon,CommonModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit  {
  @ViewChild('editableDiv') editableDiv!: ElementRef<HTMLDivElement>;
  showFiller = false;
  @Input() isSidebarOpen: boolean = false; 
  @Output() isSidebarOpenChange = new EventEmitter<boolean>(); 
  

  
  notes: NoteInterface[] = []; 
  

  currentNote: NoteInterface = {
    id: '',
    title: 'Nuova nota',
    content: '',
    creation_date: 0,
    last_edit: 0
  };

  constructor(private blankService: BlankServiceService) {}
  ngAfterViewInit() {
    this.updateEditableContent();
  }

  ngOnInit(): void {
    this.loadAllNotes();
  }

  loadAllNotes(): void {
    this.notes = this.blankService.getAllNotes();
    if (this.notes.length > 0) {
      this.selectNote(this.notes[0]); // Seleziona la prima nota
    } else {
      this.createNewNote(); // Crea una nuova nota se non ce ne sono
    }
  }

  selectNote(note: NoteInterface): void {
    this.currentNote = note;
    this.updateEditableContent();
  }

  createNewNote(): void {
    const newNote: NoteInterface = {
      id: this.generateId(),
      title: 'Nuova nota',
      content: '',
      creation_date: Date.now(),
    };
    this.notes.unshift(newNote); // Aggiungi in cima alla lista
    this.selectNote(newNote);
  }
  private updateEditableContent(): void {
    if (this.editableDiv?.nativeElement && this.currentNote) {
      this.editableDiv.nativeElement.textContent = this.currentNote.content;
    }
  }
  saveCurrentNote(): void {
    if (this.editableDiv?.nativeElement && this.currentNote) {
      this.currentNote.content = this.editableDiv.nativeElement.textContent || '';
      this.blankService.saveNote(this.currentNote);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLDivElement; 
    if (target && this.currentNote) { 
      this.currentNote.content = target.textContent || '';
    }
  }
}