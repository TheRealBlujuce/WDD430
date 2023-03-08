import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentID: number;

  @Output() documentSelected = new EventEmitter<Document>();
  @Output() documentChangedEvent = new Subject<Document[]>();


  constructor(private http: HttpClient) 
  { 
    //this.documents = MOCKDOCUMENTS;
    this.getDocuments();
    this.maxDocumentID = this.getMaxID();
  }

  getDocuments()
  {   
      this.http.get("https://wdd430-b4295-default-rtdb.firebaseio.com/documents.json")
          .subscribe( (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentID = this.getMaxID();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentChangedEvent.next(this.documents);
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  getDocument(id: number)
  {
    
    return this.documents[id]
  }

  
  storeDocuments(documents: Document[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put('https://wdd430-b4295-default-rtdb.firebaseio.com/documents.json', JSON.stringify(documents), { headers })
      .subscribe(() => {
        this.documentChangedEvent.next(this.documents);
      });
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
  this.storeDocuments(this.documents);
}

addDocument(newDocument: Document) {

  if (newDocument == undefined || newDocument == null)
  {
    return;
  }
      
  this.maxDocumentID++;
  newDocument.id = this.maxDocumentID
  this.documents.push(newDocument);
  let documentsListClone = this.documents;
  this.storeDocuments(this.documents);
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
  let documentsListClone = this.documents;
  this.storeDocuments(this.documents);
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
