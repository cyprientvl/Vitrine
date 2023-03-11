import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  listItem: any = [];
  listprice: any = [];
  listId: any = [];
  listAnim: boolean[] = [];
  loading = true;

  constructor(private item: ItemService, private router: Router){
    
    this.item.get().subscribe((data)=>{
      this.listItem = data;
      this.listItem.forEach((element: any) => {
        for(let i in element.variants){
          this.listprice.push(element.variants[i][0].prix/100.0)
          this.listId.push(element.variants[i][0].id);
          break;
        }
      });
      this.longText();
      this.loading = false;
    })

  }

  redirectProduct(n: number){
    this.router.navigate(["/shop/product/"+n])
  }

  addToCart(n: string, i: number){
    if(!this.listAnim[i]){

      let temp = localStorage.getItem('cartSneakify') || "";
      temp = temp + n + ","
      localStorage.setItem('cartSneakify', temp);

      this.listAnim[i] = true;
      setTimeout(()=>{
        this.listAnim[i] = false;
      }, 2000)
    }
  }

  longText(){
    
  }
 

}




