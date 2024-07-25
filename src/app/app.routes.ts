import { Routes } from '@angular/router';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'blog-form', component: BlogFormComponent },
  { path: 'blog-form/:id', component: BlogFormComponent }
];

