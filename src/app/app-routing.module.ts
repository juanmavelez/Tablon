import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  CanActivate,
} from '@angular/router';
import { GuardService } from '@core/services/guard/guard.service';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
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
    canActivate: [GuardService],
    children: [
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full',
      },
      {
        path: 'courses',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./courses/courses.module').then(
            (module) => module.CoursesModule
          ),
      },
      {
        path: 'profile',
        canActivate: [GuardService],
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
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
