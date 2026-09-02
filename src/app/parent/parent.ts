import { Component } from '@angular/core';
import { Child } from "../child/child";

@Component({
  selector: 'app-parent',
  standalone: true,
  templateUrl: './parent.html',
  styleUrl: './parent.css',
  imports: [Child]
})
export class Parent {
  parentMessage = 'Bonjour depuis le parent !';
  childMessage = '';
  receiveMessage(message: string) {
    console.log('Parent à reçu :', message);
    this.childMessage = message;
  }
}
