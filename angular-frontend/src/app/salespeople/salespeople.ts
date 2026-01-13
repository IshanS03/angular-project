import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sales } from '../sales/sales';
import { Salesperson } from '../salesperson/salesperson';
import { SalespersonModel } from '../models/salesperson.model';
import { Http as HttpService } from '../services/http';

@Component({
  selector: 'app-salespeople',
  imports: [CommonModule, Salesperson],
  templateUrl: './salespeople.html',
  styleUrl: './salespeople.css',
})
export class Salespeople {

  constructor(private httpService: HttpService) {
    this.getAllSalespeople();
  }
 //this array will be fed out to child Salesperson components, one each
  mockSalespeople: SalespersonModel[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', department: 'Electronics', hireDate: '2020-01-15', salary: 60000 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', department: 'Furniture', hireDate: '2019-03-22', salary: 55000 },
    { id: 3, firstName: 'Emily', lastName: 'Johnson', department: 'Clothing', hireDate: '2021-07-30', salary: 50000 },
    { id: 4, firstName: 'Michael', lastName: 'Brown', department: 'Sports', hireDate: '2018-11-12', salary: 65000 },
  ];

  //this method will be called when a child component emits the delete event
  deleteMockSalesperson(salespersonId: number) {
    console.log('Deleting salesperson with ID:', salespersonId);
    const actualIndex = this.mockSalespeople.findIndex(sp => sp.id === salespersonId);
    if (actualIndex !== -1) {
      this.mockSalespeople.splice(actualIndex, 1);
    }
  }

  //deleting a salesperson from the DB
  // we call our getALL method inside the subscribe to make sure
  // it happens after the deletion has completed successfully 
  deleteSalesperson(salespersonId: number) {
      console.log('Deleting salesperson with ID:', salespersonId);

      this.httpService.deleteSalesperson(salespersonId).subscribe(response => {
          console.log(response);
          this.getAllSalespeople();
      });
  }


  //this method will be called when a child component emits the raise salary event
  raiseMockSalary(salespersonId: number) {
    console.log('Raising salary for salesperson with ID:', salespersonId);
    const salesperson = this.mockSalespeople.find(sp => sp.id === salespersonId);
    if (salesperson) {
      salesperson.salary = Math.floor(salesperson.salary*(1.1)); // Give a 10% raise
    }
  }

  //getting all salespeople from the backend
  getAllSalespeople(){
    this.httpService.getAllSalespeople().subscribe(response => {
      if(response.body){
        this.mockSalespeople = response.body.map((spData: any) => ({
          id: spData.id,
          firstName: spData.first_name,
          lastName: spData.last_name,
          department: spData.department,
          hireDate: spData.hire_date,
          salary: spData.salary
        }));
     
      }
    });
  }

}
