import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthGardGuard } from './guards/auth-gard.guard';
import { appInterceptorProvider } from './app-interceptor';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [AuthGardGuard,
    appInterceptorProvider
    
   ],
   exports: [
     HeaderComponent,
     FooterComponent
   ] 
})
export class CoreModule { }
