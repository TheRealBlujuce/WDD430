import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.modal';
import { Contact } from '../../contacts/contacts.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  providers: [ContactService]
})
export class MessageItemComponent implements OnInit{

  @Input() message: Message;

  messageSender: string;
  private gettingContact: Subscription;

  constructor(private contactService: ContactService){}

  ngOnInit()
  {


    this.gettingContact = this.contactService.contactsChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        var getContact = this.message.sender;
        const contactOfSender: Contact = contacts[getContact]
        this.messageSender = contactOfSender.name;
        
      });

  }



}
