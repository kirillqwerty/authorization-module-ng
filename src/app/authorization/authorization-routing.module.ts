import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizedPageComponent } from "./authorized-page/authorized-page.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "my-page", component: AuthorizedPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
