import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from '@bluebits/ui';



@Component({
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent, BannerComponent],
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ngshop';
}
