import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class Child {
  @Input() message!: string;
  @Output() messageChange = new EventEmitter<string>();

  sendMessageToParent() {
    this.messageChange.emit('Message du child envoyé au parent !');
  }
}
