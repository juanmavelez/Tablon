import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule,
    ScrollingModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule,
    ScrollingModule,
  ],
})
export class MaterialModule {}
