import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  private url = 'http://127.0.0.1:3000/architect/';

  register ( architect: any ) {

    return this.http.post(this.url + 'register' , architect); 
    
  }

  login(architect: any) {
    return this.http.post(this.url + 'login', architect)
      .pipe(
        tap((res: any) => {
          // Vérifiez si la réponse contient la clé mytoken
          if (res && res.mytoken) {
            localStorage.setItem('token', res.mytoken); // Stockez le token dans le localStorage
          }
        })
      );
  }
  isLoggedIn(){
   let token = localStorage.getItem('token');
   if(token){
    return true;
   }else{
    return false;
   }

  }

  getArchitectDataFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedToken = JSON.parse(atob(tokenPayload));
      console.log(decodedToken);
      return decodedToken;
    }
    return null;
  }

  getById(id: any){
    return this.http.get(this.url + 'getbyid/' + id);
  }
}
  

