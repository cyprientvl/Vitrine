
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ItemService{
 

    private item: any;
    constructor(private http: HttpClient){
    }

    get(){
        return this.http.get(`https://apishop.sneakify.fr/ `);

    }

    getbyId(id: string){
        return this.http.get(`https://apishop.sneakify.fr/?id=`+id);
    }

    payer(data: any){
        return this.http.post('https://apishop.sneakify.fr/payer.php', data);
    }

    

}