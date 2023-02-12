import { Component, OnInit } from '@angular/core';

import { Document } from "../document.model";

import { ActivatedRoute, Params, Router} from '@angular/router'
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  providers: [DocumentService]
})
export class DocumentDetailComponent implements OnInit{

  document: Document;
  id: number;
  nativeWindow: any;

  constructor(private documentservice: DocumentService, private route: ActivatedRoute, private router: Router, private windowrefservice: WindRefService){
    this.nativeWindow = windowrefservice.getNativeWindow();
  }
  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.id = +params['id'];
      this.document = this.documentservice.getDocument(this.id);
    });
  }

  onDocumentEdit()
  {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onView()
  {
    if(this.document.url)
    {
      this.nativeWindow.open(this.document.url)
    }
  }

  
  onDelete() {
    this.documentservice.deleteDocument(this.document);
    this.router.navigate(['/documents'], {relativeTo: this.route})
  }


}
