import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { PostRequest } from '../../interfaces/routes-response'
import { Observable } from 'rxjs'
import { RoutesService } from '../../services/routes.service'

interface PostUpload {
  student: number
  route: number
  project: number
  projectTitle: string
}

@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrl: './dialog-project.component.css'
})
export class DialogProjectComponent {
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: PostUpload,
    public dialogRef: MatDialogRef<DialogProjectComponent>,
    private fb: FormBuilder,
    private routesService: RoutesService
  ) {}
  form: FormGroup = this.fb.group({
    demoUrl: [, [Validators.required]],
    repoUrl: [, [Validators.required]],
    description: [, [Validators.required]],
    image: [, [Validators.required]]
  })
  file: any
  postRequest!: PostRequest
  imagePreview: string | ArrayBuffer | null = null

  upload () {
    if (this.form.invalid || !this.file) {
      return
    }
    this.toBase64(this.file).subscribe({
      next: base64String => {
        const formValue = this.form.value
        this.postRequest = {
          student: this.data.student,
          route: this.data.route,
          project: this.data.project,
          demoUrl: formValue.demoUrl,
          repoUrl: formValue.repoUrl,
          description: formValue.description,
          image: base64String
        }
        //Call api
        this.routesService.createPost(this.postRequest).subscribe({
          next: response => {
            console.log(response)
            this.dialogRef.close()
          }
        })
      },
      error: error => {
        console.error('Error converting file to base64:', error)
      }
    })
  }

  getFile (event: any) {
    this.file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.file)
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  onFileSelected (event: Event): void {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0]
    }
  }

  toBase64 (file: File): Observable<string> {
    return new Observable<string>(observer => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1] || ''
        observer.next(base64String)
        observer.complete()
      }
      reader.onerror = error => observer.error(error)
    })
  }
}
