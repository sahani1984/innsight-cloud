import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list'
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,  
  NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

const MaterialComponent = [  
  MatNativeDateModule,
  MatProgressBarModule,  
  MatButtonModule, 
  MatSidenavModule,
  MatToolbarModule, 
  MatFormFieldModule,  
  MatInputModule, 
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
  MatTableModule,
  MatMenuModule,
  MatDatepickerModule, 
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatExpansionModule,
  MatDividerModule,
  MatPaginatorModule,
  MatCardModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatStepperModule,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
  ]

@NgModule({
  exports: [MaterialComponent],
  imports: [MaterialComponent],
  declarations: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class MaterialModule { }
