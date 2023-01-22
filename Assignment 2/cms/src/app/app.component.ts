import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedFeature = 'contact';

  onNavigate(newFeature: string){
    this.loadedFeature = newFeature;
    console.log(this.loadedFeature)
  }
}
