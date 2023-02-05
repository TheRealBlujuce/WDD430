import { Injectable, Output, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];

  @Output() documentSelected = new EventEmitter<Document>();

  constructor() 
  { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[]
  {

    return this.documents.slice();
   
  }

  getDocument(id: number): Document
  {
    this.documents.forEach((document) => {
      if (document.id == id )
      {
        return document;
      }
      else{ return null}
    });

    return null;
  }


}
