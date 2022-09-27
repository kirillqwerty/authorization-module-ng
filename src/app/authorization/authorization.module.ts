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
import { FORMS_VALIDATION_ERRORS } from "./injectionTokenSettings/valdation-errors-injection-token";
import { MyValidationErrors } from "./injectionTokenSettings/injectionTokenValue";

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
    {
      provide: FORMS_VALIDATION_ERRORS,
      useClass: MyValidationErrors,
    },
  ]
})
export class AuthorizationModule { }
