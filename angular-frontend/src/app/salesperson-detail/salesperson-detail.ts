import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '../services/http';

import { Salesperson } from '../models/salesperson';


@Component({
  selector: 'app-salesperson-detail',
  imports: [],
  templateUrl: './salesperson-detail.html',
  styleUrls: ['./salesperson-detail.css'],
})
export class SalespersonDetail {

  //aCTIVATErOUTE ALLOUS US TO USE ROUTE PARAMETERS TO CONROL PAGE CONTENT
  //WE CAN ENTER THE ROUTE DIRECTY in the URL bar
  //or, we can route to this component from another component

  //we inject an instance of activated route here 
  constructor(private route: ActivatedRoute, private httpService: Http) {
     this.getSalespersonById();
  }
  
  salesperson: Salesperson = new Salesperson(0, '', '', '', '', 0);
 
  failedId: string = ' ';
  failedStatus: string = ' ';
  
  getSalespersonById(){
    
    //we can access the parameters of the route using this ysntax
    //we're processing the results using observer arguments
    //in place of the single callback funciton,
    //we have an object with three properties:
    //next for a successful repsonse (a callback function)
    //error for an error response (a callback function)
    //complete for execution after completion of the next callback function
    
    this.httpService.getSalespersonById(this.route.snapshot.params['id']).subscribe({
      next: response => {
        if(response.body)
          this.salesperson = new Salesperson(
            response.body.id,
            response.body.first_name,
            response.body.last_name,
            response.body.department,
            response.body.hire_date,
            response.body.salary
          );
    },
      error: (err) => {this.failedId = this.route.snapshot.params['id'];
                      this.failedStatus = err.status;
      },
      complete: () => {console.log('Complete block executed')}
    });
  }
}
