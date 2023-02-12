import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact;
  id: string;

  constructor(private contactservice: ContactService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(){
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactservice.getContact(this.id);
      }
    )
  }

  onContactEdit()
  {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  
  onDelete() {
    this.contactservice.deleteContact(this.contact);
    this.router.navigate(['/contacts'], {relativeTo: this.route})
  }

}
