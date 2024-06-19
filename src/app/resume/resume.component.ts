import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Options } from 'html2canvas';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxSliderModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  selectedField: any;



  ImgPath: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwP6kt5LjCxm_7eFG3XE638Bl6NjFds_NLVg&s";
  fname: string = "Ritick Kushwaha";
  Role: string = ".Net Developer";
  Place: string = "Mumbai";
  email: string = "ritick@gmail.com";
  mobile: string = "123456789";
  skill:any;



  value: number = 50;
  options: any = {
    floor: 0,
    ceil: 100,
    step: 1,
    showTicks: true
  };
  get progressBarWidth(): string {
    return `${this.value}%`;
  }
  skillInputs: any[] = []; 
  maxSkillInputs: number = 4;
  sliderOptions: any = {
    floor: 0,
    ceil: 100,
    step: 1,
    showTicks: true
    
  };
  addSkillInput() {
    if (this.skillInputs.length < this.maxSkillInputs) {
      const id = this.skillInputs.length + 1; 
      this.skillInputs.push({ id: id, skill: '', value: 50 });
    }
  }
  removeSkillInput(index: number) {
    this.skillInputs.splice(index, 1); 
  }









  @ViewChild('content', { static: false }) content!: ElementRef;
  public SavePDF(): void {
    const content = this.content.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('test.pdf');
    });
  }
}
