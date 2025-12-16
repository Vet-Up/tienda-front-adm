import { Routes } from '@angular/router';
import { CWelcome } from '../c-welcome/c-welcome';
import { CArticlesManagement } from '../c-articles-management/c-articles-management';
import { CModifyArticle } from '../c-modify-article/c-modify-article';
import { CCreateArticle } from '../c-create-article/c-create-article';
import { CCategoriesManagement } from '../c-categories-management/c-categories-management';
import { CModifyCategory } from '../c-modify-category/c-modify-category';
import { CCreateCategory } from '../c-create-category/c-create-category';

export const routes: Routes = [
    { path: '',component:CWelcome},
    { path: 'welcome',component:CWelcome},
    { path: 'articles',component:CArticlesManagement},
    { path: 'modify-article/:productId',component:CModifyArticle},
    { path: 'create-article',component:CCreateArticle},
    { path: 'categories',component:CCategoriesManagement},
    { path: 'modify-category/:categoryId',component:CModifyCategory},
    { path: 'create-category',component:CCreateCategory}
];
