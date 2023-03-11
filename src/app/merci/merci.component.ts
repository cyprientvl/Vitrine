import { Component } from '@angular/core';

@Component({
  selector: 'app-merci',
  templateUrl: './merci.component.html',
  styleUrls: ['./merci.component.css']
})
export class MerciComponent {

  constructor(){
    localStorage.clear();
  }


}
