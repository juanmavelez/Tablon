import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then(
            (module) => module.CoursesModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user/user.module').then((module) => module.UserModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((module) => module.AuthModule),
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
