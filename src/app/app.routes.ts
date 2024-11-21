import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { SellComponent } from './features/sell/sell.component';
import { BuyComponent } from './features/buy/buy.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'auth',
                component: LoginComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [isLoggedGuard]
            },
            {
                path: 'sell',
                component: SellComponent
            },
            {
                path: 'buy',
                component: BuyComponent,
                canActivate: [isLoggedGuard]
            },
            {
                path: 'contact',
                component: ContactComponent
            },
        ]
    }
];
