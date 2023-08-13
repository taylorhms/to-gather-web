import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TgHeaderComponent } from './components/tg-header/tg-header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NovaContaComponent } from './pages/nova-conta/nova-conta.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { ChatComponent } from './pages/chat/chat.component';
import { TgMessageComponent } from './components/tg-message/tg-message.component';

@NgModule({
  declarations: [
    AppComponent,
    TgHeaderComponent,
    HomeComponent,
    LoginComponent,
    NovaContaComponent,
    ChatComponent,
    TgMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
