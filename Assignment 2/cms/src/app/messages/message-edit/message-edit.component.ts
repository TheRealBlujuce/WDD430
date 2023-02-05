import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Message } from '../message.modal';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
  providers: [MessageService]
})
export class MessageEditComponent implements OnInit{

  @ViewChild('subRef') subjectRef: ElementRef;
  @ViewChild('msgRef') msgRef: ElementRef;


  currentSender = "Will";

  constructor(private messageService: MessageService) {}

  ngOnInit() {
      
  }

  onSendMessage()
  {
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsgText = this.msgRef.nativeElement.value;

    const newMessage = new Message("1", newSubject, newMsgText, "1");
    this.messageService.addMessage(newMessage);

  }

  onClear()
  {

  }

}
