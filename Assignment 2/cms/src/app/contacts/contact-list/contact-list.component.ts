import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy{

  contacts: Contact[];
  private igChangedCont: Subscription;
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}
  term: string;

  ngOnInit() {

    this.contactService.getContacts();
    this.igChangedCont = this.contactService.contactsChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
  }
  onNewContact()
  {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
      this.igChangedCont.unsubscribe();
  }

  search(value: string) {

    this.term = value;
    
    }

}
