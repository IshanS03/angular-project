import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SalespersonModel } from '../models/salesperson.model';
import { DataPass as DataPassService } from '../services/data-pass';
import { Http as HttpService } from '../services/http';

@Component({
  selector: 'app-salesperson',
  imports: [],
  templateUrl: './salesperson.html',
  styleUrl: './salesperson.css',
})
export class Salesperson {

  //to get data from the parent, we need to load salesperson info
  //into a local variable using @Input decorator

  @Input() salesperson: SalespersonModel = {
    id: 0,
    firstName: '',
    lastName: '',
    department: '',
    hireDate: '',
    salary: 0
  };

  //@Output sends data up to the parent via event emitter
  @Output() deleteSalespersonEvent = new EventEmitter<number>();

  //@Output sends data up to the parent via event emitter
  @Output() raiseSalaryEvent = new EventEmitter<any>();

  //we also inject our service here to pass data up to it
  constructor(private datapass: DataPassService) {

  }

  setFaveSalesperson() {
    //line below doesn't work, because the component on the other end doesn't know
    //that the value has changed. Value was already assigned via the constructor
    //this.datapass.favoriteSalesperson = this.salesperson.firstName + ' ' + this.salesperson.lastName;

    //do this instead, update the subject
    this.datapass.setFavoriteSalesperson(this.salesperson.firstName);
  }

  //this method runs when clicking the button
  //it will send whatever's in the emit() parenthesis as the "message"
  deleteSalesperson() {
    this.deleteSalespersonEvent.emit(this.salesperson.id);
  }

  
 

  raiseSalary() {
    this.raiseSalaryEvent.emit(this.salesperson.id);
  }

}
