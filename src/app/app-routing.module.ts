import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then(
            (module) => module.CoursesModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(
            (module) => module.ProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
