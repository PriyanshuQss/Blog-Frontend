import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface BlogModel {
  blogId: number;
  text?: string;
  userName?: string;
  dateCreated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:5299/api/blogs'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.apiUrl);
  }

  getBlog(id: number): Observable<BlogModel> {
    return this.http.get<BlogModel>(`${this.apiUrl}/${id}`);
  }

  createBlog(blog: BlogModel): Observable<BlogModel> {
    return this.http.post<BlogModel>(this.apiUrl, blog);
  }

  updateBlog(blog: BlogModel): Observable<BlogModel> {
    return this.http.put<BlogModel>(`${this.apiUrl}/${blog.blogId}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
