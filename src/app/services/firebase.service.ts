import { Injectable, inject } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })

export class FirebaseService {
    private db = inject(Database);

    
    saveUser(username:string){
        const useRef = ref(this.db,'users/' + username);
        return set(useRef,{
            lastLogin: new Date().toISOString(),
            
        })
    }
}