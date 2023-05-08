import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, AfterContentInit {
  @ContentChildren('carouselItem') contents: QueryList<ElementRef> = new QueryList<ElementRef>();
  @ViewChildren('dot') dots?: QueryList<ElementRef>;
  
  slideIndex = 1;

  ngAfterViewInit(): void {
    this.dots!.get(this.slideIndex - 1)!.nativeElement.classList.add('active');
  }
  
  ngAfterContentInit(): void {
    this.contents.forEach(content => content.nativeElement.classList.add('fade'))
    this.showSlides(1)
  }

  showSlides(index: number) {
    if (index > this.contents.length) {this.slideIndex = 1}
    if (index < 1) {this.slideIndex = this.contents.length}
    this.contents.forEach(content => content.nativeElement.style.display = "none")
    
    let content =this.contents.get(this.slideIndex - 1);
    if (content) {
      content.nativeElement.style.display = "block";
    }

    this.dots?.forEach((dot, index) => {
      dot.nativeElement.classList.remove('active');
      if (index === this.slideIndex - 1)
        dot.nativeElement.classList.add('active');
    })
  }

  currentSlide(index: number) {
    this.showSlides(this.slideIndex = index);
  }

  plusSlides(index: number) {
    this.showSlides(this.slideIndex += index);
  }
}
