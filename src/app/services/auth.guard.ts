import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {SessionService} from "./session.service";

export const AuthGuard = () => {
const sessionService = inject(SessionService);
const router = inject(Router);

if(sessionService.currentUser()){
    return true;
} else {
    router.navigate(['/login']);
    return false;
}}