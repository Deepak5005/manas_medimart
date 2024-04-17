import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FrontCarouselComponent } from './components/front-carousel/front-carousel.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Emitters } from './components/emitters/emitter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,FooterComponent,
    LoginComponent,RegisterComponent,FrontCarouselComponent,CategoriesComponent,FormsModule,ReactiveFormsModule,
    HttpClientModule,CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  isLoggedIn = false;
  message = ''

  constructor(private http : HttpClient){}

  ngOnInit():void{
    this.http.get('https://manasmedimart.onrender.com/auth/register/user',{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.isLoggedIn = true
      this.message = `${res.name}`;
      Emitters.authEmitter.emit(true);
    },(err)=>{
      this.message = err;
      Emitters.authEmitter.emit(false);
    }
  )
  }

  logout():void{
    this.http.post('https://manasmedimart.onrender.com/auth/register/logout',{},{
      withCredentials: true
    }).subscribe(()=>{
      this.isLoggedIn = false;
    })
  }
}