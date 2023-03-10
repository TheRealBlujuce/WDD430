import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ContactService } from './contacts/contact.service';
import { DocumentService } from './documents/document.service';
import { MessageService } from './messages/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { WindRefService } from './wind-ref.service';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    MessagesComponent,
    DocumentsComponent,
    ContactItemComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule
  ],
  exports: [DndModule],
  providers: [ContactService, DocumentService, MessageService, WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
