import { Routes } from '@angular/router';
import { CWelcome } from '../c-welcome/c-welcome';
import { CArticlesManagement } from '../c-articles-management/c-articles-management';
import { CModifyArticle } from '../c-modify-article/c-modify-article';

export const routes: Routes = [
    { path: '',component:CWelcome},
    { path: 'welcome',component:CWelcome},
    { path: 'articles',component:CArticlesManagement},
    { path: 'modify/:productId',component:CModifyArticle}
];
