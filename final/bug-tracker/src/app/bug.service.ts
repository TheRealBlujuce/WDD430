import { Injectable, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Bug } from './bug.model';
import {Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  bugposts: Bug[] = [];
  private bugsRef: AngularFireList<Bug>;
  @Output() bugChangedEvent = new Subject<Bug[]>();

  constructor(private db: AngularFireDatabase ) {
    this.bugsRef = db.list<Bug>('bugs');
    this.getBugs();
  }

  getBugs(){
    
    this.bugsRef.valueChanges()
    .subscribe((bugs: Bug[]) => {
      this.bugposts = bugs
      this.bugChangedEvent.next(this.bugposts);
    });
  }

  addBug(bug: Bug): void {
    const key = this.db.createPushId();
    // Set the $key property of the bug object
    bug.id = key.toString();
    // Save the bug object in the Firebase Realtime Database
    this.db.object(`bugs/${key}`).set(bug);
  }

  updateBug(bug: Bug, newBug: Bug): void {
    newBug.id = bug.id;
    this.bugsRef.update(bug.id, newBug);
  }

  deleteBug(bug: Bug): void {
    const key = bug.id;
    this.db.object(`bugs/${key}`).remove();
  }
}