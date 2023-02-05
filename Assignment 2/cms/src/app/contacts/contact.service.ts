import { Injectable, Output, EventEmitter } from '@angular/core';

import { Contact } from './contacts.model'

import { MOCKCONTACTS } from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];

  @Output() selectedContact = new EventEmitter<Contact>();

  constructor() 
  { 
    this.contacts = MOCKCONTACTS;
  }


  getContacts(): Contact[]
  {

    return this.contacts.slice();
   
  }

  getContact(id: string): Contact
  {
    for (var i = 0; i < this.contacts.length; i++)
    {
      if (this.contacts[i].id == id)
      {
        return this.contacts[i];
      }
    }
    return null;
  }


}
