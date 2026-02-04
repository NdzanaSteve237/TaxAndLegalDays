import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
//import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    children: [{
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'programme',
        //canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/program/program.component')
              .then(m => m.ProgramComponent)
          }
        ]
      },
      {
        path: 'sponsoring',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/sponsoring/sponsoring.component')
              .then(m => m.SponsoringComponent)
          }
        ]
      },
      {
        path: 'comite',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/comite/comite.component')
              .then(m => m.ComiteComponent)
          }
        ]
      },
      {
        path: 'galerie',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/galerie/galerie.component')
              .then(m => m.GalerieComponent)
          }
        ]
      },
      {
        path: 'contact',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/contact/contact.component')
              .then(m => m.ContactComponent)
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];