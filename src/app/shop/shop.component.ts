import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  listItem: any = [];
  listprice: any = [];
  loading = true;

  constructor(private item: ItemService){
    
    this.item.get().subscribe((data)=>{
      this.listItem = data;
      this.listItem.forEach((element: any) => {
        for(let i in element.variants){
          this.listprice.push(element.variants[i][0].prix/100.0)
          break;
        }
      });
      this.loading = false;
    })

  }

}




