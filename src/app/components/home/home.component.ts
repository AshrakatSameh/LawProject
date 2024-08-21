import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { ContactService } from 'src/app/services/contact.service';
import { DirectionService } from 'src/app/shared/direction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  lang: string;

  myContactForm!: FormGroup;
  isArabic: boolean;



  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public directionService: DirectionService,
    private fb: FormBuilder, private contactService: ContactService
  ) {

    this.isArabic = this.translate.currentLang === 'ar';


    this.lang =
      localStorage.getItem('language') || this.translate.getDefaultLang();
    this.languageService.switchLanguage(this.lang); // Update the language

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
  
  changeLanguage(selectedLang: string) {
    localStorage.setItem('language', selectedLang); // Save the selected language to localStorage
    this.lang = selectedLang;
    this.languageService.switchLanguage(selectedLang);
    window.location.reload();
  }



}
