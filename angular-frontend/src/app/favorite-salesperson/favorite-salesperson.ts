import { Component } from '@angular/core';
import { DataPass as DataPassService } from '../services/data-pass';
@Component({
  selector: 'app-favorite-salesperson',
  imports: [],
  templateUrl: './favorite-salesperson.html',
  styleUrl: './favorite-salesperson.css',
})
export class FavoriteSalesperson {

    mockFave: string = 'Mock SP';

    //in order to have access to the service passing the data, 
    //we have to inject the service


    
    //assigning the value directly doesn't work
    //need to subscribe to the subject to get updates
    constructor(private dataPass: DataPassService) {
      //if you have a single argument in subscribe()
      //it's a callback function that does something with the data
       this.dataPass.favoriteSalespersonSubject.subscribe(data => {
         this.mockFave = data;
       });

    }
}
