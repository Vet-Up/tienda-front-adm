import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-c-detail-article',
  imports: [CommonModule],
  templateUrl: './c-detail-article.html',
  styleUrl: './c-detail-article.scss',
})
export class CDetailArticle {

  @Input() product:any;
  @Output() closeDetail = new EventEmitter<void>();

  close() {
    this.closeDetail.emit();
  }

}
