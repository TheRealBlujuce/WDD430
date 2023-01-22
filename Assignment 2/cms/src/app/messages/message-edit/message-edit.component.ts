import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message-modal';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {

  @ViewChild('subRef') subjectRef: ElementRef;
  @ViewChild('msgRef') msgRef: ElementRef;

  @Output() messageAdded = new EventEmitter<Message>();
  currentSender = "Will";

  onSendMessage()
  {
    const newSubject = this.subjectRef.nativeElement.value;
    const newMsgText = this.msgRef.nativeElement.value;

    const newMessage = new Message(6, newSubject, newMsgText, this.currentSender);
    this.messageAdded.emit(newMessage);

  }

  onClear()
  {

  }

}
