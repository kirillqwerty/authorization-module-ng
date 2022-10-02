import { ValidationErrors } from "@angular/forms";
import { errorInfo } from "../injectionTokenSettings/errorInfo";
import { getErrorMessage } from "./getErrorMessage";

export const defaultErrors: errorInfo[] = [
    { 
        errorName: "required", 
        errorText: (): string => `${getErrorMessage({"required": true})}`
    },
    { 
        errorName: "minlength", 
        errorText: (err: ValidationErrors): string => `${getErrorMessage(err)}`
    },
    { 
        errorName: "maxlength", 
        errorText: (err: ValidationErrors): string => `${getErrorMessage(err)}`
    },
    { 
        errorName: "email", 
        errorText: (): string => `${getErrorMessage({"email": true})}`
    },
];

