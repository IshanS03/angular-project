import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salesperson } from '../models/salesperson';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root',
})
export class Http {
 
  //don't forget to provide the HttpClient in app.config.ts
  constructor(private http: HttpClient) {
    this.getAllSales().subscribe(data => {
      console.log(data);
    });
  }
    //we can write methods that use this.http to make requests

    baseUrl: string = 'http://localhost:8080';
    
    //to get all sales
    getAllSales(): Observable<HttpResponse<Sale[]>> {
      return this.http.get<Sale[]>(`${this.baseUrl}/sale`, {observe: 'response'})

    }

    //to get all salespeople
    getAllSalespeople(): Observable<HttpResponse<Salesperson[]>> {
      return this.http.get<Salesperson[]>(`${this.baseUrl}/salesperson`, {observe: 'response'})
    }

    getSalespersonById(salespersonId: number): Observable<HttpResponse<Salesperson>> {
      return this.http.get<Salesperson>(`${this.baseUrl}/salesperson/${salespersonId}`, {observe: 'response'});
    }

    //delete a salesperson
    deleteSalesperson(salespersonId: number): Observable<HttpResponse<void>> {
      return this.http.delete<void>(`${this.baseUrl}/salesperson/${salespersonId}`, {observe: 'response'});
    }

    deleteSale(saleId: number): Observable<HttpResponse<void>> {
      return this.http.delete<void>(`${this.baseUrl}/sale/${saleId}`, {observe: 'response'});
    }

    //add a sale 
    addSale(saleData: any): Observable<HttpResponse<Sale>> {
      return this.http.post<Sale>(`${this.baseUrl}/sale`, saleData, {observe: 'response'});
    }

    //update a sale
    updateSale(saleId: number, saleData: any): Observable<HttpResponse<Sale>> {
      return this.http.put<Sale>(`${this.baseUrl}/sale/${saleId}`, saleData, {observe: 'response'});
    }
} 
  