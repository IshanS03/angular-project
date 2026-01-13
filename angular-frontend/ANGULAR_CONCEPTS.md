# Angular Concepts Guide

A beginner-friendly guide to all the Angular concepts used in this project.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Components](#components)
3. [Decorators](#decorators)
4. [Templates & Data Binding](#templates--data-binding)
5. [Control Flow](#control-flow)
6. [Routing](#routing)
7. [Services & Dependency Injection](#services--dependency-injection)
8. [HTTP Client](#http-client)
9. [RxJS & Observables](#rxjs--observables)
10. [Signals](#signals)
11. [Models & Interfaces](#models--interfaces)
12. [Application Bootstrap](#application-bootstrap)
13. [Testing](#testing)

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
├── sales/                      # Sales table
├── favorite-salesperson/       # Favorite display
├── services/                   # Shared services
│   ├── http.ts
│   └── data-pass.ts
└── models/                     # Data models
    ├── salesperson.model.ts
    └── sale.ts
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
| Sales | `app-sales` | Displays sales data in a table |
| FavoriteSalesperson | `app-favorite-salesperson` | Shows the currently selected favorite |

---

## Decorators

Decorators are special functions that add metadata to classes, properties, or methods. They start with `@`.

### @Component

Marks a class as an Angular component.

```typescript
@Component({
  selector: 'app-salesperson',
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
  @Input() salesperson!: SalespersonModel;  // Receives data from parent
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

  deleteSalesperson() {
    this.deleteSalespersonEvent.emit(this.salesperson.id);
  }
}
```

**Parent template usage:**
```html
<app-salesperson (deleteSalespersonEvent)="deleteMockSalesperson($event)">
</app-salesperson>
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
<button (click)="deleteSalesperson()">DELETE</button>
```

**File:** `src/app/salespeople/salespeople.html`

```html
<!-- Listening for custom event from child -->
<app-salesperson (deleteSalespersonEvent)="deleteMockSalesperson($event)">
</app-salesperson>
```

### Summary of Binding Syntax

| Syntax | Direction | Example |
|--------|-----------|---------|
| `{{value}}` | Component → Template | `{{salesperson.name}}` |
| `[property]="value"` | Component → Element | `[salesperson]="sp"` |
| `(event)="handler()"` | Element → Component | `(click)="delete()"` |

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
    <td>{{item.customer_first_name}}</td>
    <td>{{item.customer_last_name}}</td>
    <td>{{item.date}}</td>
    <td>{{item.total}}</td>
    <td>{{item.salesperson_id}}</td>
  </tr>
}
```

### Key Points:

- `track $index` helps Angular efficiently update the DOM when the array changes
- The variable (`sp`, `item`) is available inside the block
- This replaces the older `*ngFor` directive

---

## Routing

Routing allows navigation between different views/components.

### Route Configuration

**File:** `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { Salespeople } from './salespeople/salespeople';
import { Sales } from './sales/sales';

export const routes: Routes = [
  { path: 'salespeople', component: Salespeople },
  { path: 'sales', component: Sales },
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
  private favoriteSalespersonSubject = new BehaviorSubject<string>('');
  favoriteSalesperson = this.favoriteSalespersonSubject.asObservable();

  updateFavoriteSalesperson(newFave: string) {
    this.favoriteSalespersonSubject.next(newFave);
  }
}
```

### Using a Service (Dependency Injection)

**File:** `src/app/salesperson/salesperson.ts`

```typescript
import { DataPass } from '../services/data-pass';

export class Salesperson {
  // Angular automatically provides the service instance
  constructor(private datapass: DataPass) { }

  makeFavorite() {
    this.datapass.updateFavoriteSalesperson(this.salesperson.firstName);
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
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),  // Enables HTTP requests
    // other providers...
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

  // GET request
  getAllSalespeople(): Observable<HttpResponse<Salesperson[]>> {
    return this.http.get<Salesperson[]>(
      `${this.baseUrl}/salespeople`,
      { observe: 'response' }
    );
  }

  // POST request
  addSale(saleData: any): Observable<HttpResponse<Sale>> {
    return this.http.post<Sale>(
      `${this.baseUrl}/sales`,
      saleData,
      { observe: 'response' }
    );
  }

  // PUT request
  updateSale(saleId: number, saleData: any): Observable<HttpResponse<Sale>> {
    return this.http.put<Sale>(
      `${this.baseUrl}/sales/${saleId}`,
      saleData,
      { observe: 'response' }
    );
  }

  // DELETE request
  deleteSalesperson(salespersonId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(
      `${this.baseUrl}/salespeople/${salespersonId}`,
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
      console.log('Deleted successfully');
    });
  }
}
```

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
  private favoriteSalespersonSubject = new BehaviorSubject<string>('');

  // Expose as Observable (read-only)
  favoriteSalesperson = this.favoriteSalespersonSubject.asObservable();

  // Update the value
  updateFavoriteSalesperson(newFave: string) {
    this.favoriteSalespersonSubject.next(newFave);  // Emit new value
  }
}
```

### Subscribing to Observables

**File:** `src/app/favorite-salesperson/favorite-salesperson.ts`

```typescript
export class FavoriteSalesperson {
  mockFave: string = '';

  constructor(private datapass: DataPass) {
    // Subscribe to get updates whenever value changes
    this.datapass.favoriteSalesperson.subscribe(value => {
      this.mockFave = value;
    });
  }
}
```

### HTTP Observable Example

```typescript
this.httpService.getAllSalespeople().subscribe(response => {
  this.salespeople = response.body;  // Access the response data
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

**File:** `src/app/models/sale.ts`

```typescript
export class Sale {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  date: string;
  total: number;
  salesperson_id: number;

  constructor(
    id: number,
    customer_first_name: string,
    customer_last_name: string,
    date: string,
    total: number,
    salesperson_id: number
  ) {
    this.id = id;
    this.customer_first_name = customer_first_name;
    this.customer_last_name = customer_last_name;
    this.date = date;
    this.total = total;
    this.salesperson_id = salesperson_id;
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
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),  // Error handling
    provideRouter(routes),                  // Routing
    provideHttpClient()                     // HTTP client
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
@Input()            // Receive data from parent
@Output()           // Send events to parent
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
```

---

## Further Learning

- [Angular Official Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*This documentation was generated based on the concepts used in this Angular project.*
