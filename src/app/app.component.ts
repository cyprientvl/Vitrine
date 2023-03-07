import { Component,Inject, PLATFORM_ID  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sneakify-Vitrine';
  lang = 0;

  constructor(public translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object){
    translate.addLangs(['en', 'fr']);

  }

  openmenu(){
    document.getElementById('nav-icon4')?.classList.toggle('open');
    document.getElementsByTagName('header')[0]?.classList.toggle('openned');
  }

  

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
      this.translate.use('fr')

    } 
  }

  changel(){
    if(this.lang == 0){
      this.lang = 1;
      this.translate.use('en')

    }else{
      this.lang = 0;
      this.translate.use('fr')
    }
  }



}
