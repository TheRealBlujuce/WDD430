import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];
  maxDocumentID: number;

  @Output() documentSelected = new EventEmitter<Document>();
  @Output() documentChangedEvent = new Subject<Document[]>();


  constructor() 
  { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentID = this.getMaxID();

  }

  getDocuments(): Document[]
  {

    return this.documents;
   
  }

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
  this.documentChangedEvent.next(this.documents.slice());
}

addDocument(newDocument: Document) {

  if (newDocument == undefined || newDocument == null)
  {
    return;
  }
      
  this.maxDocumentID++;
  newDocument.id = this.maxDocumentID
  this.documents.push(newDocument);
  let documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone)
}

updateDocument(originalDocument: Document, newDocument: Document) {

  if ( (originalDocument || newDocument) == undefined || (originalDocument || newDocument) == null)
  {
    return;
  }

  let pos = this.documents.indexOf(originalDocument);
  if (pos < 0)
  {
    return;
  } 

  newDocument.id = originalDocument.id
  this.documents[pos] = newDocument
  let documentsListClone = this.documents.slice()
  this.documentChangedEvent.next(documentsListClone)
}

getMaxID(): number {

  let maxId = 0

  this.documents.forEach(function(document){
    let currentId = +document.id;
    if (currentId > maxId)
    {
      maxId = currentId;
    }
  })
      
  return maxId
}


}
