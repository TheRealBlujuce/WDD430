import { Injectable, Output, EventEmitter } from '@angular/core';
import { Message } from './message.modal'
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


 @Output() messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageID: number;

  constructor(private http: HttpClient) 
  { 
    //this.messages = MOCKMESSAGES;
    this.getMessages();
    
  }

  getMessages()
  {

    this.http.get("https://wdd430-b4295-default-rtdb.firebaseio.com/messages.json")
      .subscribe( (messages: Message[]) => {
      this.messages = messages;

      this.maxMessageID = this.getMaxID();
      this.messages.sort((a, b) => a.sender.localeCompare(b.sender));
      this.messageChangedEvent.next(this.messages);
      },
      // error method
      (error: any) => {
        console.error(error);
      }
    );
   
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

  
  storeMessages(messages: Message[]) {

    this.messageChangedEvent.emit(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put('https://wdd430-b4295-default-rtdb.firebaseio.com/messages.json', JSON.stringify(messages), { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages);
      });
  }
  

  addMessage(message: Message)
  {
    message.id = this.maxMessageID.toString();
    this.messages.push(message)
    this.storeMessages(this.messages);
    
  }


  getMaxID(): number {

    let maxId = 0
  
    this.messages.forEach(function(message){
      let currentId = +message.id;
      if (currentId > maxId)
      {
        maxId = currentId+1;
      }
    })
        
    return maxId
  }
  


}
