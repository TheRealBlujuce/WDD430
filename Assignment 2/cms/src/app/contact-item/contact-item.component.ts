import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contacts/contacts.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() contact: Contact;

  @Output() selectedContact = new EventEmitter<void>();

  constructor(){}

  ngOnInit(){}

  onSelected()
  {
    this.selectedContact.emit();
  }

}
