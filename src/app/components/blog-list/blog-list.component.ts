// src/app/blog-list/blog-list.component.ts
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';
import { BlogModel, BlogService } from '../../services/blog.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, BlogDetailComponent],
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent  {
 // blogs: BlogModel[] = [];
  @Input() blogs : BlogModel[] =[];
  @Output() edit = new EventEmitter<BlogModel>();
  @Output() delete = new EventEmitter<BlogModel>();

  constructor(private blogService: BlogService) {}

  // ngOnInit(): void {
  //   this.blogService.getBlogs().subscribe(blogs => {
  //     this.blogs = blogs;
  //   });
  // }

  onEditBlog(blog: BlogModel) {
    this.edit.emit(blog);
  }

  onDeleteBlog(blog: BlogModel) {
    this.blogService.deleteBlog(blog?.blogId).subscribe(() => {
      this.blogs = this.blogs.filter(b => b.blogId !== blog.blogId);
    });
    this.delete.emit(blog);
  }
}
