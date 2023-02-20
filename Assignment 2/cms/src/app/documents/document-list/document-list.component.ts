import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy{

  documents: Document[];
  private igChangedDoc: Subscription
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.igChangedDoc = this.documentService.documentChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )

  }

  onSelectedDocument(document: Document)
  {
    this.documentService.documentSelected.emit(document);
  }

  onNewDocument()
  {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
      this.igChangedDoc.unsubscribe();
  }

}
