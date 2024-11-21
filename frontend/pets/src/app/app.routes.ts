import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { autenticacaoGuardGuard } from './guards/autenticacao-guard.guard';

export const routes: Routes = [   
    {path:'',component:LoginComponent},
    {path:'Menu',component:MenuComponent,canActivate: [autenticacaoGuardGuard]}
];
