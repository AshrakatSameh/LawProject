import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  myContactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.myContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  
  onSubmitContact() {
    if (this.myContactForm.valid) {
      const newItem = this.myContactForm.value;
      console.log('Form Values:', newItem); // Log form values
      this.contactService.postContact(newItem).subscribe(
        () => {
          alert('Send successfully');
          console.log('Send successfully');
          this.myContactForm.reset();
        
        },
        error => {
          console.error('Error For Adding Contact:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  submitForm(event: Event) {
    event.preventDefault(); // Prevent default behavior
    if (this.myContactForm.valid) {
      this.onSubmitContact();
    } else {
      console.error('Form is invalid');
    }
  }
}
