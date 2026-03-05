import { Component, inject, signal } from '@angular/core';
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
export class Game {
  firebaseService = inject(FirebaseService);
  sessionService = inject(SessionService);
 
  highScore = signal(0);
  currentScore = signal(0);
  sessionHighScore = signal(0);

  userChoice = signal(''); 
  computerChoice = signal(''); 
  result = signal('');
  computerOptions = ['rock','paper', 'scissors'];

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
    }
    this.result.set(gameResult);
  }
    
  
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
