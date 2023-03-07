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
  constructor(private item: ItemService){
    this.item.getItem().subscribe((data)=>{
      this.listItem = data;
      console.log(this.listItem)

      this.listItem.forEach((element: any) => {
        for(let i in element.variants){
          this.listprice.push(element.variants[i][0].prix/100.0)
          
        }
      });
    })

  }

}




