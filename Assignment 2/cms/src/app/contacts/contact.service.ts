import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contacts.model'
import { MOCKCONTACTS } from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[];
  maxContactID: number;

  @Output() selectedContact = new EventEmitter<Contact>();
  @Output() contactsChangedEvent = new Subject<Contact[]>();

  constructor() 
  { 
    this.contacts = MOCKCONTACTS;
    this.maxContactID = this.getMaxID();
  }


  getContacts(): Contact[]
  {

    return this.contacts;
   
  }

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
    this.contactsChangedEvent.next(this.contacts.slice());
  }
  
  addContact(newContact: Contact) {

    if (newContact == undefined || newContact == null)
    {
      return;
    }
        
    this.maxContactID++;
    newContact.id = this.maxContactID.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice()
    this.contactsChangedEvent.next(contactsListClone)
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
  
    if ( (originalContact || newContact) == undefined || (originalContact || newContact) == null)
    {
      return;
    }
  
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0)
    {
      return;
    } 
  
    newContact.id = originalContact.id
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice()
    this.contactsChangedEvent.next(contactsListClone)
  }
  
  getMaxID(): number {

    let maxId = 0
  
    this.contacts.forEach(function(document){
      let currentId = +document.id;
      if (currentId > maxId)
      {
        maxId = currentId;
      }
    })
        
    return maxId
  }
  

}
