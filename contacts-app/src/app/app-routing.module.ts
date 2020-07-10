import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { AuthGuardService } from './auth-guard.service';


export const routes: Routes = [
  {
    path: '', redirectTo: 'contacts', pathMatch: 'full'
  },
  {
    path: 'contacts',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./screens/contacts/contacts.module').then(mod => mod.ContactsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
