import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { QuillModule } from 'ngx-quill'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { TablesComponent, ConfirmDialogComponent } from './tables/tables.component'
import { GraphsComponent } from './graphs/graphs.component'
import { WelcomeBannerComponent } from '../core/welcome-banner/welcome-banner.component';
import { NoResultsComponent } from './no-results/no-results.component';
import { LoaderComponent } from './loader/loader.component';
import { MyformModule } from '@sisitech/myform'
import { TablesModule, TablesService } from '@sisitech/tables'
import { environment } from 'src/environments/environment'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '../interceptors/auth.interceptor'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDatepickerModule } from '@angular/material/datepicker';


const authConfig = {
  APIEndpoint: environment.APIEndpointNoSlash,
  version: "api/v1",
  clientId: environment.APIClientID,
}

@NgModule({

  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDatepickerModule,

    MyformModule.forChild(authConfig),
    TablesModule.forChild(authConfig),
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    QuillModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDatepickerModule,

    MyformModule,
    TablesModule,
    TablesComponent,
    GraphsComponent,
    WelcomeBannerComponent,
    NoResultsComponent,
    LoaderComponent,
  ],
  providers: [
    TablesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [TablesComponent, GraphsComponent, WelcomeBannerComponent, LoaderComponent, ConfirmDialogComponent, NoResultsComponent]
})
export class SharedModule { }
