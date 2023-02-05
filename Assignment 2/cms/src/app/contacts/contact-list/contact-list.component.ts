import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit{

  contacts: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelectedContact(contact: Contact)
  {
    this.contactService.selectedContact.emit(contact);
  }

}
