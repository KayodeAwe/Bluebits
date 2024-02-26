import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';


@Component({
    selector: 'ngshop-home-page',
    standalone: true,
    imports: [CommonModule, AccordionModule],
    templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
