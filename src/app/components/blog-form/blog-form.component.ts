import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BlogModel } from '../../services/blog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit {
  @Input() blog: BlogModel | null = null;
  @Output() save = new EventEmitter<BlogModel>();
  @Output() cancel = new EventEmitter<void>();

  blogForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      text: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      blogId: [0],
      userName: ['UserName'],
      dateCreated: new Date()
    });
  }

  ngOnInit(): void {
    if (this.blog) {
      this.blogForm.patchValue(this.blog);
    }
  }

  saveBlog(): void {
    if (this.blogForm.valid) {
      this.save.emit(this.blogForm.value);
    }
  }

  cancelForm(): void {
    this.cancel.emit();
  }
}
