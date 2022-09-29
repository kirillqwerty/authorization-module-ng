import { AbstractControl } from "@angular/forms";

export function getErrorMessage(errorName: string, control: AbstractControl): string {
    switch (errorName) {
        case "required":
            return "Field is required";

        case "minlength":
            return `Minimum length ${control.errors?.["minlength"].requiredLength}`;

        case "maxlength":
            return `Maximum length ${control.errors?.["maxlength"].requiredLength}`;

        case "email":
            return "Incorrect, must contain @";

        case "passwordError":
            return "At least 1 number and 1 capital letter";

        case "phoneError":
            return "Incorrect phone number";

        case "passwordMatchError":
            return "Passwords do not match";

        default:
            return "error";
    }
}