import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-result',
  imports: [],
  templateUrl: './game-result.html',
  styleUrl: './game-result.css',
})
export class GameResult {
  @Input() result: string = '';
}
