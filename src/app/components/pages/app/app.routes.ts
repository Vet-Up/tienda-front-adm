import { Routes } from '@angular/router';
import { CWelcome } from '../c-welcome/c-welcome';
import { CArticlesManagement } from '../c-articles-management/c-articles-management';
import { CModifyArticle } from '../c-modify-article/c-modify-article';
import { CLogin } from '../c-login/c-login';
import { gAuthGuardGuard } from '../../../core/guards/g-auth.guard-guard';
import { CCreateArticle } from '../c-create-article/c-create-article';
import { CCategoriesManagement } from '../c-categories-management/c-categories-management';
import { CModifyCategory } from '../c-modify-category/c-modify-category';
import { CCreateCategory } from '../c-create-category/c-create-category';
import { CNotFound } from '../c-not-found/c-not-found';
import { CUsersManagement } from '../c-users-management/c-users-management';
import { CDashboard } from '../c-dashboard/c-dashboard';
import { COrdersManagement } from '../c-orders-management/c-orders-management';
import { CReviewsManagement } from '../c-reviews-management/c-reviews-management';

export const routes: Routes = [
    { path: '', component: CDashboard, canActivate: [gAuthGuardGuard] },
    { path: 'dashboard', component: CDashboard, canActivate: [gAuthGuardGuard] },
    { path: 'products', component: CArticlesManagement, canActivate: [gAuthGuardGuard] },
    { path: 'products/:productId/edit', component: CModifyArticle, canActivate: [gAuthGuardGuard] },
    { path: 'products/new', component: CCreateArticle, canActivate: [gAuthGuardGuard] },
    { path: 'categories', component: CCategoriesManagement, canActivate: [gAuthGuardGuard] },
    { path: 'categories/:categoryId/edit', component: CModifyCategory, canActivate: [gAuthGuardGuard] },
    { path: 'categories/new', component: CCreateCategory, canActivate: [gAuthGuardGuard] },
    { path: 'orders', component: COrdersManagement, canActivate: [gAuthGuardGuard] },
    { path: 'reviews', component: CReviewsManagement, canActivate: [gAuthGuardGuard] },
    { path: 'not-found', component: CNotFound , canActivate: [gAuthGuardGuard]},
    {path: 'users', component: CUsersManagement, canActivate: [gAuthGuardGuard]},
    { path: 'login', component: CLogin },
    { path: '**', component: CNotFound, canActivate: [gAuthGuardGuard] }
];
