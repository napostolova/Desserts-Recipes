import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesService } from './recipes.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    RecipesModule,
    AppRoutingModule,

  ],
  providers: [
    RecipesService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
