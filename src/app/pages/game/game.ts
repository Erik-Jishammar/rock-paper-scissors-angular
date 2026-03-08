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

  private unsubscribe?: any; // save subscription


  play(choice:string){
    this.userChoice.set(choice);
    const randomChoice = Math.floor(Math.random()* this.computerOptions.length) // cal random index/num
    const cpuChoice = this.computerOptions[randomChoice] // collect string from arr
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
          this.sessionHighScore.set(this.currentScore()); // check if CS beats the stored highscore and updaet scores locally
          this.highScore.set(this.currentScore());

          const name = this.sessionService.currentUser(); // prep data for FB
          if(name){
            const newData: Player = {
              highScore: this.currentScore(),
              lastUpdated: new Date().toISOString()
            };
            this.firebaseService.saveUser(name, newData); // save the new highscore to db
          }
      }
        } else {
      gameResult = 'LOSER!'
      const currentValue = this.currentScore();
      this.currentScore.set(Math.max(0, currentValue - 1)); // decrement current if lose, but not below 0
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
      // run listener
      this.unsubscribe = this.firebaseService.listenToUser(name, (data) => {
        if(data) {
          this.highScore.set(data.highScore);
          // console.log('Realtime Update', data.highScore);
        } else {
          // if player doesnt exist we create a new one
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
