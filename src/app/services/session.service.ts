import { Injectable, signal } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    currentUser = signal<string | null>(null);

    constructor(){
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser.set(savedUser);
        }
    }
    login(name:string){
        this.currentUser.set(name);
        localStorage.setItem('currentUser', name);
    }
    logout(){
        this.currentUser.set(null);
        localStorage.removeItem('currentUser');
    }
}