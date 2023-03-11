import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener  } from '@angular/core';
import { ItemService } from '../services/item.service';
import { isPlatformBrowser } from '@angular/common';
import Splide from '@splidejs/splide';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  splide: any;
  loading = true;
  listId: any = [];
  MainList: any = []; //{id: "", nom: "", desc: "", price: "", couleur: "", q: "", image: "", taille: ""}
  listImage: any = [];
  total = {n: 0, price: 0, country: "FR"}

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private item: ItemService){
    let temp = localStorage.getItem('cartSneakify') || "";
    let tempListId = temp.split(",");

    for(let i = 0; i < tempListId.length-1; i++){
      let find = false; 
      this.listId.forEach((element: any)=>{
        if(element == tempListId[i]){
          find = true;
        }
      })
      if(!find){
        this.listId.push(tempListId[i]);
      }
    }

    let ins = 0;
    for(let i = 0; i < this.listId.length; i++){
      this.item.getbyId(this.listId[i]).subscribe((data: any)=>{
        for(let x = 0; x < data.length; x++){
          if(data[x].variants.length != 0){

            let currentItem = {id: this.listId[i], nom: data[x].nom, desc: data[x].description, price: 0, couleur: "", taille: "",  q: 1, image: data[x].images[0], box: [x]};
            for(let vari in data[x].variants){
              currentItem.couleur = vari
              currentItem.price = data[x].variants[vari][0].prix/100.0;
              currentItem.taille = data[x].variants[vari][0].nom;
            }
           
            this.MainList.push(currentItem);
            
          }
        }
        if(ins == this.listId.length-1){
          this.loading = false;
          
          const sleep = (m: number | undefined) => new Promise(r => setTimeout(r, m));
          console.log(this.MainList)
          this.getTotal();
          this.getListImage();
          if (isPlatformBrowser(this.platformId)) {
            (async () => {
              await sleep(10);
              this.splide = new Splide('#image-carousel');
              this.splide.mount();
            })()
  
          }
        }
        ins++

      })
    }
    if(this.listId.length == 0){
        this.loading = false;

    }
  }
  
  
  getTotal(){
    this.total.price = 0;
    this.total.n = 0;
    this.MainList.forEach((element: any)=>{
      this.total.price  = this.total.price + element.price*element.q;
      this.total.n = this.total.n + Number(element.q);
    })
  }

  getListImage(){
    this.listImage = [];
    this.MainList.forEach((element: any)=>{
      this.listImage.push(element.image);
    })
  }

  removeCart(n: string){
    //localStorage.clear();
    let index = 0;
    for(let i = 0; i < this.MainList.length; i++){
      if(this.MainList[i].id == n){
        index = i;
      }
    }
    this.MainList.splice(index, 1);
    let temp = localStorage.getItem('cartSneakify') || "";
    let tempListId = temp.split(",");

    tempListId = tempListId.filter(function(element) {
      return element !== n;
    });
    let data = tempListId.join(",")
    localStorage.setItem('cartSneakify', data)

    this.getTotal();
    this.getListImage();
  }


  loadingPaye = false;
  sendCart(){
    let dataSend = {cart: <any>[], ship: ""};
    this.MainList.forEach((item: any)=>{
      dataSend.cart.push({[item.id]: item.q})
    })
    dataSend.ship = this.total.country

    this.loadingPaye = true;
    this.item.payer(dataSend).subscribe((data: any)=>{
      console.log(data.message)
      if(data.message.includes("https://checkout")){
        window.location.href = data.message
      }else{
        alert(data.message)
      }
      this.loadingPaye = false;
    })
  }

}
