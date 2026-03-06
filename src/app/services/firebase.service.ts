import { Injectable, inject } from '@angular/core';
import { Database } from '@angular/fire/database';
import { ref, set, get, onValue } from 'firebase/database';
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
    listenToUser(username:string, callback: (player:any)=> void){
         const useRef = ref(this.db,'players/' + username);

         return onValue(useRef, (snapshot)=> {
            const data = snapshot.val();
            callback(data);
        });
    }

    getAllPlayers(): Promise<any> {
        const useRef = ref(this.db, 'players');
        return get(useRef).then((snapshot) => {
            console.log('All players:', snapshot.val());
            return snapshot;
        });
    }
}
