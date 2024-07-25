import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BlogModel } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnChanges {
  @Input() blog: BlogModel | null = null;
  @Output() save = new EventEmitter<BlogModel>();
  @Output() cancel = new EventEmitter<void>();

  blogCopy: BlogModel = { blogId: 0, text: '', userName: 'UserName', dateCreated: new Date() };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blog']) {
      this.blogCopy = this.blog ? { ...this.blog } : { blogId: 0, text: '', userName: 'UserName', dateCreated: new Date() };
    }
  }

  saveBlog() {
    this.save.emit(this.blogCopy);
  }

  cancelForm() {
    this.cancel.emit();
  }
}
