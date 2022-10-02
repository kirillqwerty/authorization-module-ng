import { ValidationErrors } from "@angular/forms";

export function getErrorMessage(errors: ValidationErrors): string|null {

    for (const error in errors) {

        switch (error) {

            case "required":
                return "Field is required";

            case "minlength":
                return `Minimum length ${errors?.["minlength"].requiredLength}`;

            case "maxlength":
                return `Maximum length ${errors?.["maxlength"].requiredLength}`;

            case "email":
                return "Incorrect, must contain @";

            case "passwordError":
                return "At least 1 number and 1 capital letter";

            case "phoneError":
                return "Incorrect phone number";

            case "passwordMatchError":
                return "Passwords do not match";

            default:
                return null;
        }
    }
    return null
}


            // case "{\"required\":true}":
            //     return "Field is required";

            // case JSON.stringify({"minlength": {"requiredLength": errors?.["minlength"]?.requiredLength,"actualLength": errors?.["minlength"]?.actualLength}}):
            //     return `Minimum length ${errors?.["minlength"].requiredLength}`;

            // case JSON.stringify({"maxlength": {"requiredLength": errors?.["maxlength"]?.requiredLength,"actualLength": errors?.["maxlength"]?.actualLength}}):
            //     return `Maximum length ${errors?.["maxlength"].requiredLength}`;

            // case "{\"email\":true}":
            //     return "Incorrect, must contain @";

            // case "{\"passwordError\":true}":
            //     return "At least 1 number and 1 capital letter";

            // case "{\"phoneError\":true}":
            //     return "Incorrect phone number";

            // case "{\"passwordMatchError\":true}":
            //     return "Passwords do not match";

            // default:
            //     return null;