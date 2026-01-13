import { Component } from '@angular/core';
import { Sale } from '../models/sale';
import { Http } from '../services/http';

@Component({
  selector: 'app-sales',
  imports: [],
  templateUrl: './sales.html',
  styleUrl: './sales.css',
})
export class Sales {

  //injecting the HTTP service to make requests
  constructor(private httpService: Http) {
    //setup subscription to get sales data
    this.getAllSales();

  }

  //in Typescript, we ideally give our variables types
  //here, we are creating a variable called mockSale
  //it is of type Sale, which is the class we imported above
  //we are setting mockSale to a new instance of the Sale class
  //we are passing in values for each of the parameters in the constructor
  
  mockSale: Sale = new Sale(6, 'Gloria N.', 'Excelsis', '2023-10-15', 250000, 7500);
  arrayOfSales: Sale[] = [
    new Sale(1, 'Alice B.', 'TechCorp', '2023-10-01', 100000, 3000),
    new Sale(2, 'Bob C.', 'InnovateLtd', '2023-10-05', 150000, 4500),
    new Sale(3, 'Charlie D.', 'SolutionsInc', '2023-10-10', 200000, 6000),
    new Sale(4, 'Diana E.', 'FutureWorks', '2023-10-12', 175000, 5250),
    new Sale(5, 'Ethan F.', 'NextGen', '2023-10-14', 225000, 6750),
    new Sale(6, 'Gloria N.', 'Excelsis', '2023-10-15', 250000, 7500)
  ];
  
  //the type after <method name>: is the return type of this method
  addMockSale(): void {
    this.arrayOfSales.push(new Sale(7, 'Hank G.', 'AlphaBeta', '2023-10-20', 300000, 9000));
  }

  sales: Sale[] = [];

  getAllSales(){
    //make the request from the HTTP service
    this.httpService.getAllSales().subscribe(response => {
      if (response.body) {
        this.sales = response.body.map((saleData: any) => new Sale(
          saleData.id,
          saleData.customer_first_name,
          saleData.customer_last_name,
          saleData.date,
          saleData.total,
          saleData.salesperson_id
        ));
      }
    });
  }

  deleteSale(saleId: number) {
    this.httpService.deleteSale(saleId).subscribe(response => {
      console.log(response);
      this.getAllSales();
    });
  }
}