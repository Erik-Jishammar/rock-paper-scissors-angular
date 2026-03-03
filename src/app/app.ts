import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ang-app');
  private fb = inject(FirebaseService);

  constructor(){
    this.fb.saveUser('testing FB').then(()=>{
      console.log('Firebase testing success');
    }).catch((error)=>{
      console.log('Firebase testing failed', error);
    })
  }
}