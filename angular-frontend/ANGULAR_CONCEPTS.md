# Angular Concepts Guide

A beginner-friendly guide to all the Angular concepts used in this project.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Components](#components)
3. [Decorators](#decorators)
4. [Templates & Data Binding](#templates--data-binding)
5. [Control Flow](#control-flow)
6. [Pipes](#pipes)
7. [Routing](#routing)
8. [Services & Dependency Injection](#services--dependency-injection)
9. [HTTP Client](#http-client)
10. [HTTP Interceptors](#http-interceptors)
11. [RxJS & Observables](#rxjs--observables)
12. [Signals](#signals)
13. [Forms & Two-Way Binding](#forms--two-way-binding)
14. [Models & Interfaces](#models--interfaces)
15. [Application Bootstrap](#application-bootstrap)
16. [Testing](#testing)

---

## Project Overview

This is an **Angular 21** project using the modern **standalone components** architecture. Unlike older Angular projects that used NgModules, this project uses standalone components which are simpler and more self-contained.

### Project Structure

```
src/app/
├── app.ts                      # Root component
├── app.html                    # Root template
├── app.config.ts               # App configuration
├── app.routes.ts               # Route definitions
├── header/                     # Header component
├── footer/                     # Footer component
├── nav/                        # Navigation component
├── salespeople/                # Salespeople list (parent)
├── salesperson/                # Single salesperson (child)
├── salesperson-detail/         # Salesperson detail page
├── sales/                      # Sales table with forms
├── favorite-salesperson/       # Favorite display
├── services/                   # Shared services
│   ├── http.ts
│   └── data-pass.ts
├── interceptors/               # HTTP interceptors
│   └── auth-interceptor.ts
├── pipes/                      # Custom pipes
│   └── spongebob-pipe.ts
└── models/                     # Data models
    ├── salesperson.model.ts
    └── salesperson.ts
```

---

## Components

Components are the building blocks of Angular applications. Each component has:
- A **TypeScript class** (logic)
- An **HTML template** (view)
- A **CSS file** (styles)

### Example: App Component

**File:** `src/app/app.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-frontend');
}
```

### Key Points:

- **`selector`**: The HTML tag name to use this component (`<app-root>`)
- **`imports`**: Other components/modules this component needs
- **`templateUrl`**: Path to the HTML template
- **`styleUrl`**: Path to the CSS file

### Components in This Project:

| Component | Selector | Purpose |
|-----------|----------|---------|
| App | `app-root` | Root component, contains header, footer, and router outlet |
| Header | `app-header` | Displays the header with navigation |
| Nav | `app-nav` | Navigation links |
| Footer | `app-footer` | Page footer |
| Salespeople | `app-salespeople` | Parent component showing list of salespeople |
| Salesperson | `app-salesperson` | Child component for individual salesperson |
| SalespersonDetail | `app-salesperson-detail` | Detail view for a single salesperson |
| Sales | `app-sales` | Displays sales data with forms |
| FavoriteSalesperson | `app-favorite-salesperson` | Shows the currently selected favorite |

---

## Decorators

Decorators are special functions that add metadata to classes, properties, or methods. They start with `@`.

### @Component

Marks a class as an Angular component.

```typescript
@Component({
  selector: 'app-salesperson',
  imports: [CommonModule],
  templateUrl: './salesperson.html',
  styleUrl: './salesperson.css'
})
export class Salesperson { }
```

### @Injectable

Marks a class as a service that can be injected into other classes.

**File:** `src/app/services/data-pass.ts`

```typescript
@Injectable({
  providedIn: 'root'  // Makes it available app-wide as a singleton
})
export class DataPass { }
```

### @Input

Allows a parent component to pass data to a child component.

**File:** `src/app/salesperson/salesperson.ts`

```typescript
export class Salesperson {
  @Input() salesperson: SalespersonModel = {
    id: 0,
    firstName: '',
    lastName: '',
    department: '',
    hireDate: '',
    salary: 0
  };
}
```

**Parent template usage:**
```html
<app-salesperson [salesperson]="sp"></app-salesperson>
```

### @Output

Allows a child component to send events to a parent component.

**File:** `src/app/salesperson/salesperson.ts`

```typescript
export class Salesperson {
  @Output() deleteSalespersonEvent = new EventEmitter<number>();
  @Output() raiseSalaryEvent = new EventEmitter<any>();

  deleteSalesperson() {
    this.deleteSalespersonEvent.emit(this.salesperson.id);
  }

  raiseSalary() {
    this.raiseSalaryEvent.emit(this.salesperson.id);
  }
}
```

**Parent template usage:**
```html
<app-salesperson
  [salesperson]="sp"
  (deleteSalespersonEvent)="deleteMockSalesperson($event)"
  (raiseSalaryEvent)="raiseMockSalary($event)">
</app-salesperson>
```

### @Pipe

Marks a class as a pipe for transforming data in templates.

**File:** `src/app/pipes/spongebob-pipe.ts`

```typescript
@Pipe({
  name: 'spongebob',
})
export class SpongebobPipe implements PipeTransform {
  transform(value: string, capFirst: boolean): string {
    // Transform logic here
  }
}
```

---

## Templates & Data Binding

Angular templates use special syntax to connect the view (HTML) with the component (TypeScript).

### Interpolation `{{ }}`

Display component data in the template.

**File:** `src/app/salesperson/salesperson.html`

```html
<li>ID: {{salesperson.id}}</li>
<li>First Name: {{salesperson.firstName}}</li>
<li>Last Name: {{salesperson.lastName}}</li>
```

### Property Binding `[ ]`

Pass data from component to an element or child component.

**File:** `src/app/salespeople/salespeople.html`

```html
<!-- Passing 'sp' to the child component's 'salesperson' input -->
<app-salesperson [salesperson]="sp"></app-salesperson>
```

### Event Binding `( )`

Listen for events from elements or child components.

**File:** `src/app/salesperson/salesperson.html`

```html
<button type="button" (click)="deleteSalesperson()">DELETE</button>
<button type="button" (click)="showDetails()">Details</button>
<button type="button" (click)="raiseSalary()">RAISE SALARY</button>
```

**File:** `src/app/salespeople/salespeople.html`

```html
<!-- Listening for custom events from child -->
<app-salesperson
  (deleteSalespersonEvent)="deleteMockSalesperson($event)"
  (raiseSalaryEvent)="raiseMockSalary($event)">
</app-salesperson>
```

### Two-Way Binding `[( )]`

Combines property and event binding for form inputs (see [Forms section](#forms--two-way-binding)).

```html
<input [(ngModel)]="customerFirstName">
```

### Summary of Binding Syntax

| Syntax | Direction | Example |
|--------|-----------|---------|
| `{{value}}` | Component → Template | `{{salesperson.name}}` |
| `[property]="value"` | Component → Element | `[salesperson]="sp"` |
| `(event)="handler()"` | Element → Component | `(click)="delete()"` |
| `[(ngModel)]="value"` | Two-way | `[(ngModel)]="name"` |

---

## Control Flow

Angular provides built-in control flow syntax for conditionally rendering or repeating elements.

### @for Loop

Iterate over arrays to create repeated elements.

**File:** `src/app/salespeople/salespeople.html`

```html
@for (sp of mockSalespeople; track $index) {
  <app-salesperson
    [salesperson]="sp"
    (deleteSalespersonEvent)="deleteMockSalesperson($event)"
    (raiseSalaryEvent)="raiseMockSalary($event)">
  </app-salesperson>
}
```

**File:** `src/app/sales/sales.html`

```html
@for(item of arrayOfSales; track $index) {
  <tr>
    <td>{{item.id}}</td>
    <td>{{item.customer_first_name | spongebob: true}}</td>
    <td>{{item.customer_last_name | spongebob: false}}</td>
    <td>{{item.date | date: "shortDate"}}</td>
    <td>{{item.total | currency}}</td>
    <td>{{item.salesperson_id}}</td>
  </tr>
}
```

### @if / @else Conditional

Conditionally render elements based on a condition.

**File:** `src/app/salesperson-detail/salesperson-detail.html`

```html
@if(salesperson.id) {
  <ul>
    <li>{{salesperson.id}}</li>
    <li>{{salesperson.first_name}}</li>
    <li>{{salesperson.last_name}}</li>
    <li>{{salesperson.department}}</li>
    <li>{{salesperson.hire_date}}</li>
    <li>{{salesperson.salary}}</li>
  </ul>
}
@else {
  <p>No Salesperson with ID {{failedId}} exists!</p>
}
```

### Key Points:

- `track $index` helps Angular efficiently update the DOM when the array changes
- `@for` replaces the older `*ngFor` directive
- `@if/@else` replaces the older `*ngIf` directive
- These are the preferred syntax in modern Angular (17+)

---

## Pipes

Pipes transform data for display in templates without modifying the underlying data.

### Built-in Pipes

**Date Pipe** - Formats dates

**File:** `src/app/salesperson/salesperson.html`

```html
<li>Hire Date: {{salesperson.hireDate | date: 'fullTime'}}</li>
```

**File:** `src/app/sales/sales.html`

```html
<td>{{item.date | date: "shortDate"}}</td>
```

**Currency Pipe** - Formats numbers as currency

```html
<li>Salary: {{salesperson.salary | currency: 'USD'}}</li>
<td>{{item.total | currency}}</td>
```

### Custom Pipes

You can create your own pipes for custom transformations.

**File:** `src/app/pipes/spongebob-pipe.ts`

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spongebob',
})
export class SpongebobPipe implements PipeTransform {

  // The transform method is required
  transform(value: string, capFirst: boolean, ...args: unknown[]): string {
    let newValue = '';

    if (capFirst) {
      for (let i = 0; i < value.length; i++) {
        // Alternate casing of every other character
        if (i % 2 != 0) {
          newValue += value[i].toUpperCase();
        } else {
          newValue += value[i].toLowerCase();
        }
      }
    } else {
      for (let i = 0; i < value.length; i++) {
        if (i % 2 == 0) {
          newValue += value[i].toUpperCase();
        } else {
          newValue += value[i].toLowerCase();
        }
      }
    }
    return newValue;
  }
}
```

**Using the custom pipe:**

**File:** `src/app/sales/sales.html`

```html
<!-- Import the pipe in the component's imports array first -->
<td>{{item.customer_first_name | spongebob: true}}</td>
<td>{{item.customer_last_name | spongebob: false}}</td>
```

### Pipe Syntax

```
{{ value | pipeName }}              // No parameters
{{ value | pipeName: param1 }}      // One parameter
{{ value | pipeName: param1: param2 }}  // Multiple parameters
```

---

## Routing

Routing allows navigation between different views/components.

### Route Configuration

**File:** `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { Salespeople } from './salespeople/salespeople';
import { Sales } from './sales/sales';
import { SalespersonDetail } from './salesperson-detail/salesperson-detail';

export const routes: Routes = [
  {
    path: 'salespeople',
    component: Salespeople
  },
  {
    path: 'sales',
    component: Sales
  },
  // Route with parameter - :id is a dynamic segment
  {
    path: 'salesperson/:id',
    component: SalespersonDetail
  }
];
```

### Router Outlet

The placeholder where routed components are displayed.

**File:** `src/app/app.html`

```html
<app-header></app-header>
<router-outlet />   <!-- Routed components appear here -->
<app-footer></app-footer>
```

### Router Links

Navigation links that don't cause full page reloads.

**File:** `src/app/nav/nav.html`

```html
<a routerLink="salespeople">SALESPEOPLE</a>
<a routerLink="sales">SALES</a>
```

### Programmatic Navigation

Navigate from within a component using the Router service.

**File:** `src/app/salesperson/salesperson.ts`

```typescript
import { Router } from '@angular/router';

export class Salesperson {
  constructor(private router: Router) { }

  showDetails() {
    // Navigate to /salesperson/123 (where 123 is the id)
    this.router.navigate(['/salesperson' + this.salesperson.id]);
  }
}
```

### Route Parameters with ActivatedRoute

Access route parameters in a component.

**File:** `src/app/salesperson-detail/salesperson-detail.ts`

```typescript
import { ActivatedRoute } from '@angular/router';

export class SalespersonDetail {
  constructor(private route: ActivatedRoute, private httpService: Http) {
    this.getSalespersonById();
  }

  getSalespersonById() {
    // Access the 'id' parameter from the URL
    const id = this.route.snapshot.params['id'];

    this.httpService.getSalespersonById(id).subscribe({
      next: response => {
        // Handle successful response
      },
      error: (err) => {
        // Handle error
      }
    });
  }
}
```

### Providing the Router

**File:** `src/app/app.config.ts`

```typescript
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // other providers...
  ]
};
```

---

## Services & Dependency Injection

Services are classes that handle business logic, data fetching, or shared state. Angular's dependency injection system provides services to components that need them.

### Creating a Service

**File:** `src/app/services/data-pass.ts`

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Singleton - one instance for entire app
})
export class DataPass {
  // BehaviorSubject for sharing data between components
  favoriteSalespersonSubject = new BehaviorSubject<string>('');
  favoriteSalesperson = this.favoriteSalespersonSubject.asObservable();

  setFavoriteSalesperson(newFave: string) {
    this.favoriteSalespersonSubject.next(newFave);
  }
}
```

### Using a Service (Dependency Injection)

**File:** `src/app/salesperson/salesperson.ts`

```typescript
import { DataPass as DataPassService } from '../services/data-pass';
import { Router } from '@angular/router';

export class Salesperson {
  favoriteSalesperson: string = '';

  // Angular automatically provides the service instances
  constructor(private datapass: DataPassService, private router: Router) {
    // Subscribe to changes in the favorite
    this.datapass.favoriteSalespersonSubject.subscribe(fave => {
      this.favoriteSalesperson = fave;
    });
  }

  setFaveSalesperson() {
    this.datapass.setFavoriteSalesperson(this.salesperson.firstName);
  }
}
```

### How Dependency Injection Works:

1. Mark the service with `@Injectable({ providedIn: 'root' })`
2. Add the service as a constructor parameter
3. Angular automatically creates and provides the service instance

---

## HTTP Client

The HttpClient service makes HTTP requests to APIs.

### Setting Up HttpClient

**File:** `src/app/app.config.ts`

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

### HTTP Service

**File:** `src/app/services/http.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // GET all salespeople
  getAllSalespeople(): Observable<HttpResponse<Salesperson[]>> {
    return this.http.get<Salesperson[]>(
      `${this.baseUrl}/salesperson`,
      { observe: 'response' }
    );
  }

  // GET single salesperson by ID
  getSalespersonById(salespersonId: number): Observable<HttpResponse<Salesperson>> {
    return this.http.get<Salesperson>(
      `${this.baseUrl}/salesperson/${salespersonId}`,
      { observe: 'response' }
    );
  }

  // POST - create new sale
  addSale(saleData: any): Observable<HttpResponse<Sale>> {
    return this.http.post<Sale>(
      `${this.baseUrl}/sale`,
      saleData,
      { observe: 'response' }
    );
  }

  // PUT - update existing sale
  updateSale(saleId: number, saleData: any): Observable<HttpResponse<Sale>> {
    return this.http.put<Sale>(
      `${this.baseUrl}/sale/${saleId}`,
      saleData,
      { observe: 'response' }
    );
  }

  // DELETE salesperson
  deleteSalesperson(salespersonId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(
      `${this.baseUrl}/salesperson/${salespersonId}`,
      { observe: 'response' }
    );
  }
}
```

### Using the HTTP Service

**File:** `src/app/salespeople/salespeople.ts`

```typescript
export class Salespeople {
  constructor(private httpService: Http) { }

  deleteSalesperson(id: number) {
    this.httpService.deleteSalesperson(id).subscribe(response => {
      console.log(response);
      this.getAllSalespeople();  // Refresh the list
    });
  }
}
```

---

## HTTP Interceptors

Interceptors allow you to modify HTTP requests before they are sent or responses before they are processed. Common uses include adding authentication headers, logging, or error handling.

### Creating an Interceptor

**File:** `src/app/interceptors/auth-interceptor.ts`

```typescript
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

// Functional interceptor (modern Angular approach)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Encode credentials for Basic Auth
  let authString: string = btoa('admin:password123');

  // Clone the request and add the Authorization header
  let newReq = req.clone({
    headers: req.headers.set('Authorization', 'Basic ' + authString)
  });

  // Pass the modified request to the next handler
  return next(newReq);
};
```

### Registering the Interceptor

**File:** `src/app/app.config.ts`

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Add interceptors to the HttpClient
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

### How Interceptors Work:

1. Every HTTP request passes through all registered interceptors
2. Interceptors can modify the request (add headers, transform data)
3. Call `next(req)` to pass the request to the next interceptor or the server
4. Interceptors can also modify responses on the way back

---

## RxJS & Observables

RxJS is a library for reactive programming using Observables. Observables represent streams of data that can be subscribed to.

### Key Concepts:

| Concept | Description |
|---------|-------------|
| **Observable** | A stream of values over time |
| **BehaviorSubject** | An Observable that holds a current value |
| **subscribe()** | Listen for values from an Observable |
| **next()** | Emit a new value to subscribers |

### BehaviorSubject Example

**File:** `src/app/services/data-pass.ts`

```typescript
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataPass {
  // BehaviorSubject holds current value (starts with '')
  favoriteSalespersonSubject = new BehaviorSubject<string>('');

  // Expose as Observable (read-only)
  favoriteSalesperson = this.favoriteSalespersonSubject.asObservable();

  // Update the value
  setFavoriteSalesperson(newFave: string) {
    this.favoriteSalespersonSubject.next(newFave);  // Emit new value
  }
}
```

### Subscribing to Observables

**Simple callback:**

```typescript
this.httpService.deleteSalesperson(id).subscribe(response => {
  console.log(response);
});
```

**Observer object with next/error/complete:**

**File:** `src/app/salesperson-detail/salesperson-detail.ts`

```typescript
this.httpService.getSalespersonById(this.route.snapshot.params['id']).subscribe({
  // Called when the request succeeds
  next: response => {
    if (response.body) {
      this.salesperson = new Salesperson(
        response.body.id,
        response.body.first_name,
        response.body.last_name,
        response.body.department,
        response.body.hire_date,
        response.body.salary
      );
    }
  },
  // Called when the request fails
  error: (err) => {
    this.failedId = this.route.snapshot.params['id'];
    this.failedStatus = err.status;
  },
  // Called after next completes (optional)
  complete: () => {
    console.log('Complete block executed');
  }
});
```

### Using map() to Transform Data

```typescript
this.httpService.getAllSalespeople().subscribe(response => {
  // Transform the API response to match our model
  this.mockSalespeople = response.body.map((spData: any) => ({
    id: spData.id,
    firstName: spData.first_name,
    lastName: spData.last_name,
    department: spData.department,
    hireDate: spData.hire_date,
    salary: spData.salary
  }));
});
```

---

## Signals

Signals are Angular's new reactive primitive for managing state. They're simpler than RxJS for component-level state.

### Creating a Signal

**File:** `src/app/app.ts`

```typescript
import { signal } from '@angular/core';

export class App {
  // Create a signal with initial value
  protected readonly title = signal('angular-frontend');
}
```

### Using Signals in Templates

```html
<h1>{{ title() }}</h1>  <!-- Call as function to read value -->
```

### Updating Signals

```typescript
// Set a new value
this.title.set('New Title');

// Update based on current value
this.title.update(current => current + ' Updated');
```

---

## Forms & Two-Way Binding

Angular provides powerful form handling capabilities.

### Template-Driven Forms with ngModel

**File:** `src/app/sales/sales.ts`

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  imports: [FormsModule, SpongebobPipe, CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './sales.html',
  styleUrls: ['./sales.css'],
})
export class Sales {
  // Form properties bound to inputs
  customerFirstName: string = '';
  customerLastName: string = '';
  date: string = '';
  total: number = 0;
  salespersonId: number = 0;
}
```

### Two-Way Binding Syntax

**File:** `src/app/sales/sales.html`

```html
<form>
  <label for="customerFirstName">Customer First Name</label>
  <input type="text"
         id="customerFirstName"
         name="customerFirstName"
         [(ngModel)]="customerFirstName">

  <label for="customerLastName">Customer Last Name</label>
  <input type="text"
         id="customerLastName"
         name="customerLastName"
         [(ngModel)]="customerLastName">

  <label for="date">Date</label>
  <input type="date"
         id="date"
         name="date"
         [(ngModel)]="date">

  <label for="total">Total</label>
  <input type="number"
         id="total"
         name="total"
         [(ngModel)]="total">

  <label for="salespersonId">Salesperson ID</label>
  <select id="salespersonId"
          name="salespersonId"
          [(ngModel)]="salespersonId">
    @for(id of salespersonIds; track $index) {
      <option value="{{id}}">{{id}}</option>
    }
  </select>

  <button type="button" (click)="createSale()">Create Sale</button>
</form>
```

### How Two-Way Binding Works:

- `[]` (property binding) - Updates the input when the TypeScript variable changes
- `()` (event binding) - Updates the TypeScript variable when the input changes
- `[()]` (banana-in-a-box) - Does both simultaneously

**Important:** When using `ngModel`, you must also include the `name` attribute on the input element.

---

## Models & Interfaces

Models define the shape of your data. TypeScript interfaces and classes help with type safety.

### Interface

**File:** `src/app/models/salesperson.model.ts`

```typescript
export interface SalespersonModel {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  hireDate: string;
  salary: number;
}
```

### Class with Constructor

**File:** `src/app/models/salesperson.ts`

```typescript
export class Salesperson {
  id: number;
  first_name: string;
  last_name: string;
  department: string;
  hire_date: string;
  salary: number;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    department: string,
    hire_date: string,
    salary: number
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.department = department;
    this.hire_date = hire_date;
    this.salary = salary;
  }
}
```

### Interface vs Class:

| Feature | Interface | Class |
|---------|-----------|-------|
| Runtime code | No | Yes |
| Methods | No | Yes |
| Constructor | No | Yes |
| Use case | Type checking only | Need to create instances |

---

## Application Bootstrap

How Angular starts your application.

### Main Entry Point

**File:** `src/main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

### Application Configuration

**File:** `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),              // Error handling
    provideRouter(routes),                             // Routing
    provideHttpClient(withInterceptors([authInterceptor]))  // HTTP with interceptors
  ]
};
```

---

## Testing

Angular uses TestBed for testing components and services.

### Component Test

**File:** `src/app/app.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-frontend' title`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('angular-frontend');
  });
});
```

### Service Test

**File:** `src/app/services/http.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { Http } from './http';

describe('Http', () => {
  let service: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Http);  // Get service instance
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### Key Testing Concepts:

| Concept | Purpose |
|---------|---------|
| `TestBed.configureTestingModule()` | Set up the testing module |
| `TestBed.createComponent()` | Create component for testing |
| `TestBed.inject()` | Get a service instance |
| `fixture.componentInstance` | Access the component class |
| `fixture.nativeElement` | Access the DOM |

---

## Quick Reference

### Binding Cheat Sheet

```html
<!-- Interpolation: Display data -->
{{ value }}

<!-- Property binding: Set element/component property -->
[property]="value"

<!-- Event binding: Handle events -->
(event)="handler()"

<!-- Two-way binding (for forms) -->
[(ngModel)]="value"
```

### Decorator Cheat Sheet

```typescript
@Component({...})    // Define a component
@Injectable({...})   // Define a service
@Pipe({...})         // Define a pipe
@Input()             // Receive data from parent
@Output()            // Send events to parent
```

### Control Flow Cheat Sheet

```html
<!-- Loop -->
@for (item of items; track $index) {
  <div>{{ item }}</div>
}

<!-- Conditional -->
@if (condition) {
  <div>Shown when true</div>
}
@else {
  <div>Shown when false</div>
}
```

### Pipe Cheat Sheet

```html
<!-- Built-in pipes -->
{{ date | date: 'shortDate' }}
{{ price | currency: 'USD' }}
{{ text | uppercase }}
{{ text | lowercase }}

<!-- Custom pipe with parameter -->
{{ name | spongebob: true }}
```

---

## Concepts Summary

This project demonstrates:

1. **Standalone Components** - No NgModules, self-contained components
2. **Dependency Injection** - Services, constructor injection
3. **Parent-Child Communication** - @Input, @Output, EventEmitter
4. **RxJS Observables** - BehaviorSubject, subscribe, next/error/complete
5. **Routing** - Routes, RouterLink, RouterOutlet, route parameters
6. **Programmatic Navigation** - Router.navigate(), ActivatedRoute
7. **HTTP Client** - GET, POST, PUT, DELETE requests
8. **HTTP Interceptors** - Request/response modification
9. **Template Syntax** - Interpolation, property/event binding
10. **Modern Control Flow** - @for, @if/@else
11. **Built-in Pipes** - date, currency formatting
12. **Custom Pipes** - Creating your own transformations
13. **Two-Way Binding** - [(ngModel)] for forms
14. **Reactive State** - Signals
15. **Services with providedIn: 'root'** - Singleton pattern
16. **Testing** - TestBed, ComponentFixture, Jasmine/Vitest

---

## Further Learning

- [Angular Official Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*This documentation covers Angular concepts used in this project (Angular 21).*
