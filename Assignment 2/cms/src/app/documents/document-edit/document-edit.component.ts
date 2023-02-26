import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{

  id: number;
  editMode = false;
  originalDocument: Document;
  document: Document;


  constructor(private route: ActivatedRoute, private router: Router, private documentService: DocumentService){}
  ngOnInit(){
    // sub to params
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        

        this.originalDocument = this.documentService.getDocument(this.id);
        console.log(this.editMode);

        if (this.originalDocument == (undefined || null))
        {
          return;
        }
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  OnSubmit(form: NgForm)
  {
    const value = form.value;
    let newDocument = new Document(value.id, value.name, value.description, value.url, null);
    if (this.editMode == true)
    {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    }
    else
    {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents'])
  }

  
  onCancel() {
    this.router.navigate(['/documents'])
  }


}
