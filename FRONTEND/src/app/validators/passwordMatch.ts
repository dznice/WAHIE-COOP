import { AbstractControl } from "@angular/forms";

export function passwordMatch(password: string, confirm_pass: string) {

    return function (form: AbstractControl) {

        const passwordValue = form.get(password)?.value

        const confirmPasswordValue = form.get(confirm_pass)?.value

        if (passwordValue === confirmPasswordValue)

            return null;

        return { passwordMismatchError: true }

    }
}



