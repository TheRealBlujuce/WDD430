import { Component, Input } from '@angular/core';
import { Contact } from '../contacts/contacts.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {

  @Input() contact: Contact;
  @Input() index: number;
  
}
