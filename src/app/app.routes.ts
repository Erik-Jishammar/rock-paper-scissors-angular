import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Game} from './pages/game/game';
import {Highscore} from './pages/highscore/highscore';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        title: 'Login'
    },
    {
        path: 'game',
        component: Game,
        title: 'Game',
        canActivate: [AuthGuard]
    },
    {
        path: 'highscore',
        component: Highscore,
        title: 'Highscore',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
