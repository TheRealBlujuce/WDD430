import { Component } from '@angular/core';
import { Message } from '../message-modal';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(1, "Question", "I have a question about something", "Bro. Jackson"),
    new Message(2, "Question", "How are the assignemnts going?", "Bro. Jackson"),
    new Message(3, "Question", "I hope they are going well!", "Bro. Jackson")
  ]

  onAddMessage(message: Message)
  {
    this.messages.push(message)
  }

}
