import { Component } from '@angular/core';
import { Sale } from '../models/sale';
import { Http } from '../services/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpongebobPipe } from '../pipes/spongebob-pipe';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, FormsModule, SpongebobPipe],
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
  salespersonIds: number[] = [];

  //these variables will hold our create form values
  //each is mapped to a form input
  //changing the form changes the values, and changing the values changes the form
  customerFirstName: string = '';
  customerLastName: string = '';
  date: string = '';
  total: number = 0;
  salespersonId: number = 0;

  //for the updateform
  idUpdate: number = 0;
  updateCustomerFirstName: string = '';
  updateCustomerLastName: string = '';
  updateDate: string = '';
  updateTotal: number = 0;
  updateSalespersonId: number = 0;



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

  getAllSalespersonIds(){
    this.httpService.getAllSalespeople().subscribe(response => {
      if (response.body) {
        this.salespersonIds = response.body.map((spData: any) => spData.id);
      }
    });
  }

  createSale() {
    let newSale = new Sale(0, this.customerFirstName, this.customerLastName,
      this.date, this.total, this.salespersonId);

      //if you don't subscribe to a 
    this.httpService.addSale(newSale).subscribe(response => {
      console.log(response);
      this.getAllSales();
      this.getAllSalespersonIds();
    });
  }

  updateSale() {
    let updatedSale = new Sale(this.idUpdate, this.updateCustomerFirstName,
      this.updateCustomerLastName, this.updateDate, this.updateTotal,
      this.updateSalespersonId);
    this.httpService.updateSale(this.idUpdate, updatedSale).subscribe(response => {
      console.log(response);
      this.getAllSales();
      this.getAllSalespersonIds();
    });
  }

  deleteSale(saleId: number) {
    this.httpService.deleteSale(saleId).subscribe(response => {
      console.log(response);
      this.getAllSales();
    });
  }
}