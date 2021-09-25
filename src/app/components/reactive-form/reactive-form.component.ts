import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  countries = ['', 'India', 'Nepal', 'Israel', 'US', 'Russia'];

  person: any = {
    firstName: 'Victor',
    lastName: 'Smirnov',
    email: 'vvv@mail.me',
    age: 55,
    phone: '555-22-33',
    country: 'Russia',
    skills: [{name: 'Java'}, {name: 'JavaScript'}, {name: 'HTML'}]
  }

  reactiveForm: FormGroup | undefined;
  
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.person.skills = this.person.skills.forEach((item: any) => this.skills.push(this.skillItem(item.name)));
    this.reactiveForm?.patchValue(this.person);
  }

  createForm = () => {
    this.reactiveForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null],
      email: [null, [Validators.email, Validators.required]],
      age: [null, [Validators.max(65), Validators.min(15)]],
      phone: [null, Validators.required],
      country: [null],
      skills: this.formBuilder.array([])
    });
  };

  get skills() {
    return this.reactiveForm?.get('skills') as FormArray;
  }

  skillItem(item?: string): FormGroup {
    return this.formBuilder.group({
      name: item || null
    });
  }

  removeSkill = (index: number) => this.skills.removeAt(index);
  addSkill = () => this.skills.push(this.skillItem());

}
