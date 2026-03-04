import { Component,inject } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { Player } from '../../model/player.model';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private SessionsService = inject(SessionService);
  private firebaseService = inject(FirebaseService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  login(){
    const name = this.loginForm.value.username;
    if(name?.trim()){
      const newPlayerData = {
        highScore: 0,
        lastUpdated: new Date().toISOString(),
      }
      this.SessionsService.login(name);
      this.firebaseService.saveUser(name, newPlayerData);
      this.router.navigate(['/game']);
      // save name to LS and navigate to game
    } else {
      alert('Username is required');}
  }
}
