import { Injectable } from '@angular/core';
import { RedirectService } from './redirect.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: RedirectService) { 
    this.user = localStorage.getItem('user');
  }
  user: any = null;
  
  isLogged(): boolean {
    return this.getUser() !== null ? true : false;
  }
  getUser(): user | null{
    try{
      return JSON.parse(localStorage.getItem('user') ?? '');
    }catch(ex){
      return null;
    }
  }
  setUser(userData: any): void{
    localStorage.setItem('user', JSON.stringify(userData));
    this.user = JSON.parse(localStorage.getItem('user') ?? '')
  }
  removeUser(){
    localStorage.removeItem('user');
    console.log(localStorage.getItem('user'))
    this.router.redirectTo('');
  }
}

export interface user{
  username: string,
  pass: string,
  id: number
  role: {
    id: number,
    roleDescription: string
  }
}