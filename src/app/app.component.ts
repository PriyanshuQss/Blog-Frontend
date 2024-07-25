import { Component } from '@angular/core';
import { BlogModel, BlogService } from './services/blog.service';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlogListComponent, BlogFormComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  blogs: BlogModel[] = [];
  editingBlog: BlogModel | null = null;
  showBlogForm: boolean = false;

  constructor(private blogService: BlogService) {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
    });
  }

  openNewBlogForm() {
    this.editingBlog = null;
    this.showBlogForm = true;
  }

  editBlog(blog: BlogModel) {
    this.editingBlog = { ...blog };
    this.showBlogForm = true;
  }

  deleteBlog(blog: BlogModel) {
    this.blogService.deleteBlog(blog.blogId).subscribe(() => {
      this.loadBlogs();
    });
  }

  saveBlog(blog: BlogModel) {
    if (this.editingBlog) {
      this.blogService.updateBlog(blog).subscribe(() => {
        debugger
        this.loadBlogs();
      });
    } else {
      this.blogService.createBlog(blog).subscribe(() => {
        debugger
        this.loadBlogs();
      });
    }
    this.editingBlog = null;
    this.showBlogForm = false;
  }

  cancel() {
    this.editingBlog = null;
    this.showBlogForm = false;
  }
}
