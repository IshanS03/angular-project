import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//the @Injectable decorator marks this class as one that
//can have dependencies injected into it
//this injectable is a singleton
@Injectable({
  providedIn: 'root',
})
export class DataPass {

  //we can't simply store values in this way
  //if we want other components to be aware that they've changed
  //favoriteSalesperson: string = 'Service SP2';

  //a BehavioSubject has a current state
  //when that state chnages, it notifies subscribers that it has done so
  favoriteSalespersonSubject = new BehaviorSubject<string>('');

  ///we take our subject and create an Observable, so we can asynchronously
  //watch for changes to the value
  favoriteSalesperson = this.favoriteSalespersonSubject.asObservable();


  constructor() {}

  //this method tells the subejct to update to the new state
  //and emit a change notification to subscribers
  setFavoriteSalesperson(newFave: string) {
    this.favoriteSalespersonSubject.next(newFave);
  }
  
}
