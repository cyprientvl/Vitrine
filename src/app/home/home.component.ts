import { Component, HostListener, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  newLetter = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2, private el: ElementRef, private translate: TranslateService, private http: HttpClient) {
  }

  @HostListener('window:resize', ['$event'])


  private setSizes() {
    const element = this.el.nativeElement;
    const width = this.renderer.parentNode(element).offsetWidth;
    this.tkt1 = (width * 500 / 1440) + 'px';
    this.tkt2 = (width * 704 / 1440) + 'px';
  }

  @HostListener('window:scroll') scrolling(){
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= 1000 && !this.dejaActiver) {
      
      this.dejaActiver = true;
      this.newLetter = true;

      setTimeout(()=>{
        document.querySelector("div.popNewsLetter")?.classList.add('affiche');
      }, 1000)

    }
  }
 
  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.setSizes();
      AOS.init();
    } 

    
  }

  openautofill() {
    document.getElementById('popup')?.classList.toggle('show');
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  tkt1 = ""
  tkt2 = ""
  dejaActiver= false;
  input = "";
  valider = {msg: "", val: false};

  newsLetter(){
    console.log(this.translate.currentLang)
    this.http.post("https://apishop.sneakify.fr/emails.php", {email: this.input, lang: this.translate.currentLang}).subscribe((data: any)=>{
      this.valider.msg = data.message
      this.valider.val = data.valid
    })
    this.input = "";
  }

  closePopUp(){
    this.valider.msg = "";
    this.newLetter = false;
  }
  
}
