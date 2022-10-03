import { ValidationErrors } from "@angular/forms";
import { errorInfo } from "../injectionTokenSettings/errorInfo";

export const defaultErrors: errorInfo =
    { 
        "required": (): string => "Field is required",
    
        "minlength": (err: ValidationErrors): string => `Minimum length ${err?.["minlength"].requiredLength}`,

        "maxlength": (err: ValidationErrors): string => `Maximum length ${err?.["maxlength"].requiredLength}`,
 
        "email": (): string => "Incorrect, must contain @",
        
        "": (): string => "Incorrect input"
    }


