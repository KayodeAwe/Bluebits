import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'admin-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'admin';
}
