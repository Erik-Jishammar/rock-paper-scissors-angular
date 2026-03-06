import { Component, inject, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-highscore',
  imports: [],
  templateUrl: './highscore.html',
  styleUrl: './highscore.css',
})
export class Highscore {
  firebaseService = inject(FirebaseService); 
  topPlayers = signal<any[]>([]);

  constructor() {
    this.highScoreLeaderBoard();
  }

  highScoreLeaderBoard() {
    this.firebaseService.getAllPlayers().then((snapshot) => {
      const allPlayersData = snapshot.val() as any;

    const playersArray = Object.entries(allPlayersData)
    console.log(playersArray);

    const formattedPlayers = playersArray.map((item: any) => {
      return {
        name: item[0],
        highScore: item[1].highScore,
      };
    });

    const sortedScore = formattedPlayers.sort((currentPlayer, nextPlayer) => {
      return nextPlayer.highScore - currentPlayer.highScore;
    });
    
    this.topPlayers.set(sortedScore);
  });
}
}
