import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  private ngUnsubscribe = new Subject<void>();
  signupForm!: FormGroup;
  errMessage: string | null = null;
  loading: boolean = false;
  user!: User;

  constructor(private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        this.noEmptySpacesValidator(),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        this.noEmptySpacesValidator(),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.max(120),
        Validators.min(1),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        this.noEmptySpacesValidator(),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.noSpaceValidation,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        this.noSpaceValidation,
      ]),
    });
  }
  ngOnInit(): void {}

  get signupFormControls() {
    return this.signupForm.controls;
  }
  noEmptySpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && value.trim().length < 3) {
        return { noEmptySpaces: true };
      }
      return null;
    };
  }
  noSpaceValidation(control: AbstractControl): ValidationErrors | null {
    let controlValue = control.value as string;
    if (controlValue.indexOf(' ') >= 0) {
      return { noSpaceValidator: true };
    } else {
      return null;
    }
  }
  submitForm() {
    this.loading = true;
    this.authService
      .addUser(this.signupForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.user = res;
          this.errMessage = null;
          this.loading = false;
        },
        error: (errMessage) => {
          console.log(errMessage);
          this.errMessage = errMessage;
          this.loading = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
