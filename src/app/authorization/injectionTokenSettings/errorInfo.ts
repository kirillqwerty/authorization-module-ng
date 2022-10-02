import { ValidationErrors } from "@angular/forms";

export interface errorInfo{
    errorName: string,
    errorText: (error: ValidationErrors) => string
}