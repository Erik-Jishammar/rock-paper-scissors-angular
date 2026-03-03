import { Component, output } from '@angular/core';

@Component({
  selector: 'app-choice-buttons',
  imports: [],
  templateUrl: './choice-buttons.html',
  styleUrl: './choice-buttons.css',
})
export class ChoiceButtons {
SelectedChoice = output<string>();

select(choice:string){
  this.SelectedChoice.emit(choice);
}
}
