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
    /*
    const testName = 'test-' + new Date().getTime();
    this.fb.saveUser(testName, {
      highScore: 99,
      lastUpdated: new Date().toISOString(),
    }).then(()=>{
      console.log('Firebase SUCCESS - Check for:', testName);
    }).catch((error)=>{
      console.log('Firebase FAILED', error);
    })
    */
  }
}