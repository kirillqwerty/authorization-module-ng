import { ValidationErrors } from "@angular/forms";

export type errorInfo = Record<string, (error: ValidationErrors) => string>
