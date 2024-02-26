import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'admin-nx-welcome',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h2>admin panel</h2>
    `,
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class NxWelcomeComponent {}
