import { Routes } from '@angular/router';
import { CWelcome } from '../c-welcome/c-welcome';
import { CArticlesManagement } from '../c-articles-management/c-articles-management';
import { CModifyArticle } from '../c-modify-article/c-modify-article';
import { CCreateArticle } from '../c-create-article/c-create-article';
import { CCategoriesManagement } from '../c-categories-management/c-categories-management';
import { CModifyCategory } from '../c-modify-category/c-modify-category';
import { CCreateCategory } from '../c-create-category/c-create-category';
import { CNotFound } from '../c-not-found/c-not-found';

export const routes: Routes = [
    { path: '', component: CWelcome },
    { path: 'dashboard', component: CWelcome },
    { path: 'products', component: CArticlesManagement },
    { path: 'products/:productId/edit', component: CModifyArticle },
    { path: 'products/new', component: CCreateArticle },
    { path: 'categories', component: CCategoriesManagement },
    { path: 'categories/:categoryId/edit', component: CModifyCategory },
    { path: 'categories/new', component: CCreateCategory },
    { path: 'not-found', component: CNotFound },
    { path: '**', component: CNotFound } 
];
