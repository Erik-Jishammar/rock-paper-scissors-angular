import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  imports: [],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css',
})
export class Scoreboard {
@Input() highScore: number = 0;
@Input() currentScore: number = 0; 
@Input() sessionHighScore: number = 0; 

}
