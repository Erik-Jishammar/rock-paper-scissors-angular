import { Component, inject, signal } from '@angular/core';
import { ChoiceButtons } from '../../components/choice-buttons/choice-buttons';
import { FirebaseService } from '../../services/firebase.service';
import { SessionService } from '../../services/session.service';
import { Player } from '../../model/player.model';


@Component({
  selector: 'app-game',
  imports: [ChoiceButtons],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  firebaseService = inject(FirebaseService);
  sessionService = inject(SessionService);
  highScore = signal(0);

  constructor(){
  
    const name = this.sessionService.currentUser();
    if(name){
      this.firebaseService.getUser(name)
      .then((snapshot)=> {
        if(snapshot.exists()){
          const data = snapshot.val() as Player; 
          // update signal with data from db
          this.highScore.set(data.highScore);
          console.log(data.highScore);
      } else {
        const newPlayerData : Player = { // create new player with highscore 0
          highScore: 0,
          lastUpdated: new Date().toISOString()
        };
        this.firebaseService.saveUser(name, newPlayerData);
        console.log('New player created in firebase');
        
      }
      })
    }
  }
}

