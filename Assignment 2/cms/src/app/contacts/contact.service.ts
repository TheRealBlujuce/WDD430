import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contacts.model'
import { MOCKCONTACTS } from './MOCKCONTACTS'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  maxContactID: number;

  @Output() selectedContact = new EventEmitter<Contact>();
  @Output() contactsChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) 
  { 
    //this.contacts = MOCKCONTACTS;
    this.getContacts();
    this.maxContactID = this.getMaxID();
  }


  getContacts()
  {
    this.http.get("https://wdd430-b4295-default-rtdb.firebaseio.com/contacts.json")
      .subscribe( (contacts: Contact[]) => {
      this.contacts = contacts;

      this.maxContactID = this.getMaxID();
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
      this.contactsChangedEvent.next(this.contacts);
      },
      // error method
      (error: any) => {
        console.error(error);
      }
    );
  }

  getContact(id: string)
  {
    return this.contacts[id];
  }

  storeContacts(contacts: Contact[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put('https://wdd430-b4295-default-rtdb.firebaseio.com/contacts.json', JSON.stringify(contacts), { headers })
      .subscribe(() => {
        this.contactsChangedEvent.next(this.contacts);
      });
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
    this.storeContacts(this.contacts);
  }
  
  addContact(newContact: Contact) {

    if (newContact == undefined || newContact == null)
    {
      return;
    }
        
    this.maxContactID++;
    newContact.id = this.maxContactID.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts;
    this.storeContacts(contactsListClone);

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
    let contactsListClone = this.contacts;
    this.storeContacts(contactsListClone);

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
