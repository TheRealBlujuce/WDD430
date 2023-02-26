import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // sub to params
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
      
        this.originalContact = this.contactService.getContact(this.id);
        console.log("currently in edit mode");

        if (this.originalContact == (undefined || null))
        {
          return;
        }
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        
        if (this.contact.group != (undefined || null))
        {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }

      }
    )
  }

  OnSubmit(form: NgForm)
  {
    const value = form.value;
    let newContact = new Contact(value.id, value.name, value.email,value.phone,value.imgUrl, this.groupContacts);
    if (this.editMode == true)
    {
      this.contactService.updateContact(this.originalContact, newContact)
    }
    else
    {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts'])
  }


  onCancel() {
    this.router.navigate(['/contacts'])
  }

  
isInvalidContact(newContact: Contact) {
  if (!newContact) {// newContact has no value
    console.log("No value is true");
    return true;
    
  }
  if (this.contact && newContact.id === this.contact.id) {
    console.log("value is equal to current contact");
    return true;
     
  }
  for (let i = 0; i < this.groupContacts.length; i++){
     if (newContact.id === this.groupContacts[i].id) {
      console.log("value is to contact in list");
      return true;
       
    }
  }
  console.log("value is not currently in list");
  return false;
}

addToGroup($event: any) {
  const selectedContact: Contact = $event.dragData;
  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact){
     return;
  }
  this.groupContacts.push(selectedContact);
}

onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}


}
