import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import Splide from '@splidejs/splide';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {

  infoItem: any;
  splide: any;
  image = []
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private item: ItemService) {

    /*this.item.getItem().subscribe((data)=>{
      if(data){
        this.infoItem = data[this.route.snapshot.params['id']];
        console.log(this.infoItem)
        this.image = this.infoItem.images
      }
      
    })*/
    this.item.get().subscribe((data: any) => {
      if (data) {
        this.infoItem = data[this.route.snapshot.params['id']];
        this.image = this.infoItem.images;

        const sleep = (m: number | undefined) => new Promise(r => setTimeout(r, m));

        if (isPlatformBrowser(this.platformId)) {
          (async () => {
            await sleep(10);
            this.splide = new Splide('#image-carousel');
            this.splide.mount();
          })()

        }

      }
    })
  }

}
