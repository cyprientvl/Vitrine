
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ItemService{
 

    //private item: BehaviorSubject<any>
    private item: any;
    constructor(private http: HttpClient){
        //this.item = new BehaviorSubject<any>([]);
    }

    get(){
        return this.http.get(`https://apishop.sneakify.fr/ `);

        /*return this.http.get(`https://apishop.sneakify.fr/ `).subscribe( (data)=>{
            //this.item.next(data);
            
        });*/
    }

    /*getItem(){
        return this.item.asObservable();
    }*/

}