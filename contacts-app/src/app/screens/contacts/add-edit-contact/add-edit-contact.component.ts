import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit {
  contactForm: FormGroup;

  title = 'Add Contact'

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditContactComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    // building form
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(0)[0-9 ]{9}')
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
    if (data) {
      this.contactForm.setValue(data)
      this.title = 'Edit Contact'
    }
  }

  ngOnInit(): void {
  }

  onSave() {
    this.dialogRef.close(this.contactForm.getRawValue())
  }

  onClose() {
    this.dialogRef.close()
  }

}
