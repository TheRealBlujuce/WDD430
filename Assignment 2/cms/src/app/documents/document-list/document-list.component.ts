import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  @Output() currentSlectedDocument = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, "Test Document", "This is a test document. We want to make sure this is working.", "Here is a URL", []),
    new Document(2, "Test Document", "This is a test document. We want to make sure this is working.", "Here is a URL", []),
    new Document(3, "Test Document", "This is a test document. We want to make sure this is working.", "Here is a URL", []),
    new Document(4, "Test Document", "This is a test document. We want to make sure this is working.", "Here is a URL", []),
    new Document(5, "Test Document", "This is a test document. We want to make sure this is working.", "Here is a URL", []),

  ];

  onSelectedDocument(document: Document)
  {
    this.currentSlectedDocument.emit(document);
  }

}
