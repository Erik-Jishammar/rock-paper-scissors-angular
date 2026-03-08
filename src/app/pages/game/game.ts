import { Component, inject, signal, OnDestroy } from '@angular/core';
import { ChoiceButtons } from '../../components/choice-buttons/choice-buttons';
import { FirebaseService } from '../../services/firebase.service';
import { SessionService } from '../../services/session.service';
import { Player } from '../../model/player.model';
import { GameResult } from '../../components/game-result/game-result';
import { Scoreboard } from "../../components/scoreboard/scoreboard";



@Component({
  selector: 'app-game',
  imports: [ChoiceButtons, Scoreboard, GameResult],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game implements OnDestroy {
  firebaseService = inject(FirebaseService);
  sessionService = inject(SessionService);
 
  highScore = signal(0);
  currentScore = signal(0);
  sessionHighScore = signal(0);

  userChoice = signal(''); 
  computerChoice = signal(''); 
  result = signal('');
  computerOptions = ['rock','paper', 'scissors'];

  private unsubscribe?: any; // store subscription for cleanup

  play(choice:string){
    this.userChoice.set(choice);
    const randomChoice = Math.floor(Math.random()* this.computerOptions.length); // calculate random index
    const cpuChoice = this.computerOptions[randomChoice]; // get random choice from array
    this.computerChoice.set(cpuChoice); // update signal

    let gameResult = '';
    if(choice === cpuChoice){
      gameResult = 'Draw'
    } else if(
    (choice === 'rock' && cpuChoice === 'scissors') ||
    (choice === 'paper' && cpuChoice === 'rock') ||
    (choice === 'scissors' && cpuChoice === 'paper') ) {
      gameResult = 'You win!'

      const currentValue = this.currentScore(); 
      this.currentScore.set( currentValue + 1); // increment current score

      if(this.currentScore() > this.highScore()){
          this.sessionHighScore.set(this.currentScore()); // updte highscore locally if current score is higher
          this.highScore.set(this.currentScore());

          const name = this.sessionService.currentUser(); // format data for Firebase
          if(name){
            const newData: Player = {
              highScore: this.currentScore(),
              lastUpdated: new Date().toISOString()
            };
            this.firebaseService.saveUser(name, newData); // save the new highscore to db
          }
      }
        } else {
      gameResult = 'LOSER!';
      const currentValue = this.currentScore();
      this.currentScore.set(Math.max(0, currentValue - 1)); // decrement current score if loss, clamped to 0
    }
    this.result.set(gameResult);
  }

  resetSession(){
    this.currentScore.set(0);
    this.sessionHighScore.set(0);
    // clean ui
    this.userChoice.set('');
    this.computerChoice.set(''); 
    this.result.set('');
  }


  
  constructor(){
    const name = this.sessionService.currentUser();
    if(name){
      // subscribe to realtime database updates
      this.unsubscribe = this.firebaseService.listenToUser(name, (data) => {
        if(data) {
          this.highScore.set(data.highScore);
          // console.log('Realtime Update', data.highScore);
        } else {
          // create a new player record if none exists
          const newPlayerData : Player = {
            highScore: 0,
            lastUpdated: new Date().toISOString()
          };
          this.firebaseService.saveUser(name, newPlayerData);
          // console.log('new player created in fb');
        }
      });
    }
    
  }

  ngOnDestroy() {
    // cleanup
    if(this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
