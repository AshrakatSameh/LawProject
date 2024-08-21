import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgToastService } from 'ng-angular-popup';
import { LanguageService } from 'src/app/language.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { DirectionService } from 'src/app/shared/direction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lang: string;

  
  isSubMenuOpen: boolean = false;
  isSidebarVisible: boolean = true;



  // tables show and hide

  isContactTableShow = false;
  isBookTableShow = false;
  isArticleTableShow = false;
  isArticleAddingFormShow =false;
  isBookAddingFormShow=false;
  isClientTableShow=false;

  books:any[] = [];
  articles:any[] =[];
  contacts:any[]=[];
  clients:any[] =[];

  myArticleForm:FormGroup;
  myBookForm:FormGroup;

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllArticles();
    this.getAllContacts();
    this.getAllClients();

    this.myArticleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      postDate: ['', Validators.required]
    });

  
   
  }

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public directionService: DirectionService,
    private renderer: Renderer2,
    private bookService :BooksService,
    private articleService :ArticlesService,
    private fb: FormBuilder,
    private contactService:ContactService,
    private clientService:ClientService

  ) {
    this.lang =
      localStorage.getItem('language') || this.translate.getDefaultLang();
    this.languageService.switchLanguage(this.lang); // Update the language

    this.myArticleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      postDate:['',Validators.required]
  });

  this.myBookForm=this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    author:['',Validators.required],
    imageUrl:['',Validators.required]

  });
}

toggleContactUsTable() :void{
  this.isContactTableShow = true;
  this.isBookTableShow = false;
  this.isArticleTableShow = false;
  this.isArticleAddingFormShow=false;
  this.isBookAddingFormShow=false;
  this.isClientTableShow=false;


}

toggleBookTable():void {
  this.isContactTableShow = false;
  this.isBookTableShow = true;
  this.isArticleTableShow = false;
  this.isArticleAddingFormShow=false;
  this.isBookAddingFormShow=false;
  this.isClientTableShow=false;



}

toggleArticleTable() :void{
  this.isContactTableShow = false;
  this.isBookTableShow = false;
  this.isArticleTableShow = true;
  this.isArticleAddingFormShow=false;
  this.isBookAddingFormShow=false;
  this.isClientTableShow=false;



}

toggleAtricleAddingForm():void{
  this.isContactTableShow = false;
  this.isBookTableShow = false;
  this.isArticleTableShow = false;
  this.isArticleAddingFormShow=true;
  this.isBookAddingFormShow=false;
  this.isClientTableShow=false;


}

toggleBookAddingForm():void{
  this.isContactTableShow = false;
  this.isBookTableShow = false;
  this.isArticleTableShow = false;
  this.isArticleAddingFormShow=false;
  this.isBookAddingFormShow=true;
  this.isClientTableShow=false;


}

toggleClientTable():void{
  this.isContactTableShow = false;
  this.isBookTableShow = false;
  this.isArticleTableShow = false;
  this.isArticleAddingFormShow=false;
  this.isBookAddingFormShow=false;
  this.isClientTableShow=true;


}



  


  
 
  
  getAllBooks(){
    this.bookService.getAllBooks().subscribe((res:any)=>{
      this.books = res;
    })
  }

  getAllArticles(){
    this.articleService.getAllArticles().subscribe((res:any)=>{
      this.articles= res;
    })
  }

getAllContacts(){
  this.contactService.getAllContacts().subscribe((res:any)=>{
    this.contacts=res
  })

}

getAllClients(){
  this.clientService.getAllClients().subscribe((res:any)=>{
    this.clients=res
  })

}




  onSubmitArticle() {
    if (this.myArticleForm.valid) {
      const newArticleItem = this.myArticleForm.value;
      console.log('Form Values:', newArticleItem); // Log form values
      this.articleService.postArticle(newArticleItem).subscribe(
        () => {
          alert('Article item added successfully');
          console.log('Article item added successfully');
          this.myArticleForm.reset();
          this.getAllArticles();
        },
        error => {
          console.error('Error adding Article item:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  

  deleteArticleById(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this record?');
      
    // If the user confirmed the deletion
    if (confirmed) {
        // Proceed with deletion
        this.articleService.deleteArticleById(id).subscribe(
            () => {
                console.log('Record deleted successfully');
                // Refresh data after successful deletion
                this.getAllArticles();
            },
            error => {
                console.error('Error deleting record:', error);
            }
        );
    } else {
        // User canceled the deletion
        console.log('Deletion canceled');
    }
  }

  deleteBookById(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this record?');
      
    // If the user confirmed the deletion
    if (confirmed) {
        // Proceed with deletion
        this.bookService.deleteBookById(id).subscribe(
            () => {
                console.log('Record deleted successfully');
                // Refresh data after successful deletion
                this.getAllBooks();
            },
            error => {
                console.error('Error deleting record:', error);
            }
        );
    } else {
        // User canceled the deletion
        console.log('Deletion canceled');
    }
  }

  deleteContactById(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this record?');
      
    // If the user confirmed the deletion
    if (confirmed) {
        // Proceed with deletion
        this.contactService.deleteContactById(id).subscribe(
            () => {
                console.log('Record deleted successfully');
                // Refresh data after successful deletion
                this.getAllContacts();
            },
            error => {
                console.error('Error deleting record:', error);
            }
        );
    } else {
        // User canceled the deletion
        console.log('Deletion canceled');
    }
  }

  deleteClientById(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this record?');
      
    // If the user confirmed the deletion
    if (confirmed) {
        // Proceed with deletion
        this.clientService.deleteClienttById(id).subscribe(
            () => {
                console.log('Record deleted successfully');
                // Refresh data after successful deletion
                this.getAllClients();
            },
            error => {
                console.error('Error deleting record:', error);
            }
        );
    } else {
        // User canceled the deletion
        console.log('Deletion canceled');
    }
  }


  postBook(){
    if (this.myBookForm.valid) {
      const newItem = this.myBookForm.value;
      console.log('Form Values:', newItem); // Log form values
      this.bookService.postBook(newItem).subscribe(
        () => {
          alert('Book item added successfully');
          console.log('Book item added successfully');
          this.myBookForm.reset();
          this.getAllBooks();
        },
        error => {
          console.error('Error adding Book item:', error);
        }
      );
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

  authService= inject(AuthService);
  router = inject(Router);
  toast= inject(NgToastService)
  
  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;


  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;

    const contentElement = document.getElementById('main-content');
    if (this.isSidebarVisible) {
      this.renderer.addClass(contentElement, 'expanded');
    } else {
      this.renderer.removeClass(contentElement, 'expanded');
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout = () => {
    this.authService.logout();
    this.toast.success({detail:"SUCCESS",summary: 'logged out', duration: 1000});
    this.toast.success({
      detail: "Logout success",
      summary: "You have been successfully logged out.",
      duration: 5000, // duration in milliseconds
    });
    this.router.navigate(['login']);
  };



}

