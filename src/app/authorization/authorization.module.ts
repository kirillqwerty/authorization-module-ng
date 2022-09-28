import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./services/http.service";
import { AuthService } from "./services/auth.service";
import { AuthorizedPageComponent } from "./authorized-page/authorized-page.component";
import { ErrWrapperComponent } from "./err-wrapper/err-wrapper.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthorizedPageComponent,
    ErrWrapperComponent
  ],
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    AuthService,
    // {
    //   provide: FORMS_VALIDATION_ERRORS,
    //   useFactory: getFormCustomValidationErrors,
    //   deps: [AbstractControl]
    // },
  ]
})
export class AuthorizationModule { }
