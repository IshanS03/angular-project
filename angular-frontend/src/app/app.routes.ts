import { Routes } from '@angular/router';
import { Salespeople } from './salespeople/salespeople';
import { Sales } from './sales/sales';
import { SalespersonDetail } from './salesperson-detail/salesperson-detail';

// each item in the route array is a single path
// the path property is whatever's after the base URL in the browser
// the component property points to the component to load
export const routes: Routes = [
{
    path: 'salespeople',
    component: Salespeople
},

{
    path: 'sales',
    component: Sales
},

//this path sets up an ActivatedRoute parameter called ID
{
    path: 'salesperson/:id',
    component: SalespersonDetail
}

];
