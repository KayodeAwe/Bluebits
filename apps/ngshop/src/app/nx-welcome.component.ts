import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngshop-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
   <h2>ngeshop</h2>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
