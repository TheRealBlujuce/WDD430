import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from './message.modal'
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable({
  providedIn: 'root'
})
export class MessageService {


 @Output() messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[];

  constructor() 
  { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]
  {

    return this.messages.slice();
   
  }

  getMessage(id: string): Message
  {
    this.messages.forEach((message) => {
      if (message.sender == id )
      {
        return message;
      }
      else{ return null}
    });

    return null;
  }

  addMessage(message: Message)
  {
    this.messages.push(message)
    this.messageChangedEvent.emit(this.messages.slice())
  }

}
