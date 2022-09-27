import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { defaultErrors } from "./defaultErrors";

export interface FormGroupControls {
    [key: string]: AbstractControl;
}

// export interface AllValidationErrors {
//     control_name: string;
//     error_name: string;
//     error_value: any;
//   }

// export function getFormCustomValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
//     let errors: AllValidationErrors[] = [];
//     Object.keys(controls).forEach(key => {
//       const control = controls[ key ];
//       if (control instanceof FormGroup) {
//         errors = errors.concat(getFormCustomValidationErrors(control.controls));
//       }
//       const controlErrors: ValidationErrors = controls[ key ].errors as ValidationErrors;
//       if (controlErrors !== null) {
//         Object.keys(controlErrors).forEach(keyError => {
//           errors.push({
//             control_name: key,
//             error_name: keyError,
//             error_value: controlErrors[ keyError ]
//           });
//         });
//       }
//     });
//     return errors;
//   }

export function getFormCustomValidationErrors(controls: FormGroupControls): string[] {
    let errors: string[] = [];
    Object.keys(controls).forEach(key => {

        const control = controls[key];

        if (control instanceof FormGroup) {
            errors = errors.concat(getFormCustomValidationErrors(control.controls));
        }

        const controlErrors: ValidationErrors = controls[key].errors as ValidationErrors;
        
        if (controlErrors !== null) {
            Object.keys(controlErrors).forEach(keyError => {
                if (!defaultErrors.includes(keyError)) {
                    errors.push(keyError);   
                }
            });
        }
    });
    return errors;
}