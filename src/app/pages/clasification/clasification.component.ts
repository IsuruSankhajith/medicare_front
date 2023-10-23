import { Component, NgModule } from '@angular/core';
import { ImageClasificationService } from '@services/image-clasification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clasification',
  templateUrl: './clasification.component.html',
  styleUrls: ['./clasification.component.scss']
})

export class ClasificationComponent {
  imageUrl: any;
  selectedFile: File;
  melonimaImageResult: any;
  imageResult: string;

  constructor(
    private toastr: ToastrService,
    private imageClassificationService: ImageClasificationService
) {}

  onFileSelected(event) {
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  onChooseFileClick() {
    this.imageResult = "";
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.toastr.success('Successfully Uploaded!');
      this.imageClassificationService.uploadImage(this.selectedFile)
        .subscribe(
          response => {
            this.imageResult = response.message
            console.log('Response from server:', response);
            // Handle the response here
          },
          error => {
            console.error('Error uploading image:', error);
          }
        );
    }
  }
}
