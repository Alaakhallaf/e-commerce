import { authGuard } from './core/guards/auth.guard';

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';

import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { logedGuard } from './core/guards/loged.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DetailsComponent } from './components/details/details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { PayComponent } from './components/pay/pay.component';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
    
    {path:'', component:AuthLayoutComponent, canActivate:[logedGuard], children:[
        {path:"", redirectTo:'login' , pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
       {path:'forget' , component:ForgetPasswordComponent}
    ]},
    {path:'', component:BlankLayoutComponent, children:[
        {path:"", redirectTo:'home' , pathMatch:'full'},

        // Public browsing routes - no login required.
        {path:'home', component:HomeComponent},
        {path:'products', component:ProductComponent},
        {path:'categories', component:CategoriesComponent},
        {path:'brands', component:BrandsComponent},
        {path:'details/:id',component:DetailsComponent
        },

        // Routes that require an authenticated user.
        {path:'cart', component:CartComponent, canActivate:[authGuard]},
        {path:'wish', component:WishListComponent, canActivate:[authGuard]},
        {path:'allorders',component:AllordersComponent, canActivate:[authGuard]
        },
        {path:'pay/:id',component:PayComponent, canActivate:[authGuard]
        }
    ]},
    {path:'**', component:NotfoundComponent},
];