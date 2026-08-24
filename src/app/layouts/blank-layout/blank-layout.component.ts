import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthApiService } from '../../core/services/auth.service';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavBlankComponent, NavAuthComponent, RouterOutlet, FooterComponent, AsyncPipe],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {
  private readonly _AuthApiService = inject(AuthApiService)

  // Drives which navbar (guest vs authenticated) is shown on the public
  // pages (Home, Products, Details, ...) that this layout hosts.
  isLoggedIn$ = this._AuthApiService.isLoggedIn$;
}