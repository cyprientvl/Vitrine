import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import Splide from '@splidejs/splide';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  loading = true;

  infoItem: any; //donnée de l'item
  splide: any; //slide
  image = []; //image du slider

  color: any = []; //tt les couleurs dispo
  price = {size: "", price: 0} //la size select avec sont prix et la couleur select
  taille: any = []; //les tailles avec leurs prix de la couleur select


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private item: ItemService, private router: Router){
    
    this.item.get().subscribe((data: any)=>{
      if(data){
        this.infoItem = data[this.route.snapshot.params['id']];
        if(this.infoItem == null){
          this.router.navigate(["/shop"])
        }else{
          this.loading = false;
          this.image = this.infoItem.images;
          for(let i in this.infoItem.variants){
            this.color.push(i)
          }

          this.selectColor(0);
          this.selectSize(0);
  
          const sleep = (m: number | undefined) => new Promise(r => setTimeout(r, m));
  
          if (isPlatformBrowser(this.platformId)) {
            (async () => {
              await sleep(10);
              this.splide = new Splide('#image-carousel');
              this.splide.mount();
            })()
  
          }
        }
        
        
      }
    })
  }

  

  selectColor(n: number){
    this.taille = [];
    for(let i in this.infoItem.variants[this.color[n]]){
      this.taille.push({size: this.infoItem.variants[this.color[n]][i].nom, price: this.infoItem.variants[this.color[n]][i].prix/100})
    }
    this.selectSize(0);
  }

  selectSize(n: number){
    this.price.size = this.taille[n].size;
    this.price.price = this.taille[n].price;

  }
  
}
