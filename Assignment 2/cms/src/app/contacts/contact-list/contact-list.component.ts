import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [
    new Contact(1, "Bro. Jackson", "jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", []),
    new Contact(2, "Bro. Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", [])
  ];

  constructor() {}

  ngOnInit() {}

}
