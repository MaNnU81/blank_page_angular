import { Component, input, OnInit } from '@angular/core'; // Aggiungi OnInit
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BlankServiceService } from '../../services/blank-service.service';
import { NoteInterface } from '../../model/note-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit { // Implementa OnInit
  showFiller = false;
  isSidebarOpen = input(false);

  currentNote: NoteInterface = {
    id: '',
    title: 'Nuova nota',
    content: '',
    creation_date: 0
  };

  constructor(private blankService: BlankServiceService) {}

  ngOnInit(): void {
    this.loadSavedNote();
  }

  loadSavedNote(): void {
    const savedNotes = this.blankService.getAllNotes();
    if (savedNotes.length > 0) {
      this.currentNote = savedNotes[0]; 
    } else {
      this.currentNote = {
        id: this.generateId(),
        title: 'Nuova nota',
        content: '',
        creation_date: Date.now()
      };
    }
  }

  onContentChange(event: Event): void {
    this.currentNote.content = (event.target as HTMLElement).textContent || '';
  }

  saveNote(): void {
    this.blankService.saveNote(this.currentNote);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}