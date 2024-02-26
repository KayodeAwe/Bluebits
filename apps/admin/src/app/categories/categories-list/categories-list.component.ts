import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'admin-categories-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit{
  categories = [
    {
      id: 1,
      name: 'category-1'
    },
    {
      id: 2,
      name: 'category-2'
    },
    {
      id: 3,
      name: 'category-3'
    }
  ];

  constructor(){}

  ngOnInit(): void {

  }

}
