import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
import { Erreur404Component } from './erreur404/erreur404.component';
import { CartComponent } from './cart/cart.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { FormsModule } from '@angular/forms';
import { MerciComponent } from './merci/merci.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "conditions",component: ConditionsComponent},
  {path: "confidentialite", component: ConfidentialiteComponent},
  {path: "mentions-legales", component: MentionsLegalesComponent},
  {path: "shop", component: ShopComponent},
  {path: "shop/product/:id", component: ProductComponent},
  {path: "cart", component: CartComponent},
  {path: "merci", component: MerciComponent},
  {path: "", component: HomeComponent},
  {path: "**", component: Erreur404Component }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
