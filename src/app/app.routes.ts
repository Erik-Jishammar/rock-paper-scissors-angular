import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Game} from './pages/game/game';
import {Highscore} from './pages/highscore/highscore';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        title: 'Login'
    },
    {
        path: 'game',
        component: Game,
        title: 'Game'
    },
    {
        path: 'highscore',
        component: Highscore,
        title: 'Highscore'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
