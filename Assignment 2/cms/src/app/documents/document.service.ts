import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];

  @Output() documentSelected = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();

  constructor() 
  { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[]
  {

    return this.documents;
   
  }

  // getDocument(id: number): Document
  // {
  //   this.documents.forEach((document) => {
  //     if (document.id == id )
  //     {
  //       return document;
  //     }
  //     else{ return null}
  //   });

  //   return null;
  // }

  getDocument(id: number)
  {
    return this.documents[id]
  }

  
deleteDocument(document: Document) {
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
     return;
  }
  this.documents.splice(pos, 1);
  this.documentChangedEvent.emit(this.documents.slice());
}


}
