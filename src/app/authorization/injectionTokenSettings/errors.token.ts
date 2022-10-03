import { InjectionToken } from "@angular/core"
import { errorInfo } from "./errorInfo"

export const FORMS_VALIDATION_ERRORS = new InjectionToken<errorInfo>("errors")