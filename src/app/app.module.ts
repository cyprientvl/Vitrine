import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { Erreur404Component } from './erreur404/erreur404.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ItemService } from './services/item.service';
import { NgxLoadingModule } from 'ngx-loading';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfidentialiteComponent,
    ConditionsComponent,
    CartComponent,
    Erreur404Component,
    MentionsLegalesComponent,
    ShopComponent,
    ProductComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
