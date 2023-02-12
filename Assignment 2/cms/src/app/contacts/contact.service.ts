import { Injectable, Output, EventEmitter } from '@angular/core';

import { Contact } from './contacts.model'

import { MOCKCONTACTS } from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];

  @Output() selectedContact = new EventEmitter<Contact>();
  @Output() contactsChangedEvent = new EventEmitter<Contact[]>();

  constructor() 
  { 
    this.contacts = MOCKCONTACTS;
  }


  getContacts(): Contact[]
  {

    return this.contacts;
   
  }

  // getContact(id: string): Contact
  // {
  //   for (var i = 0; i < this.contacts.length; i++)
  //   {
  //     if (this.contacts[i].id == id)
  //     {
  //       return this.contacts[i];
  //     }
  //   }
  //   return null;
  // }

  getContact(id: string)
  {
    return this.contacts[id];
  }

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactsChangedEvent.emit(this.contacts.slice());
  }
  

}
