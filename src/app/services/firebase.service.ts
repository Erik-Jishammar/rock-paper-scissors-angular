import { Injectable, inject } from '@angular/core';
import { Database} from '@angular/fire/database';
import { ref, set, get } from 'firebase/database';
import { Player } from '../model/player.model';

@Injectable({ providedIn: 'root' })

export class FirebaseService {
    private db = inject(Database);

    
    saveUser(username:string, playerData:Player){
        const useRef = ref(this.db,'/players/' + username);
        console.log('Sending data to:', useRef.toString());
        return set(useRef,playerData);
    }
    getUser(username:string){
        const useRef = ref(this.db,'players/' + username);
        return get(useRef);
    }
    

}