import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { FavoriteSalesperson } from '../favorite-salesperson/favorite-salesperson';

@Component({
  selector: 'app-header',
  imports: [Nav, FavoriteSalesperson],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
