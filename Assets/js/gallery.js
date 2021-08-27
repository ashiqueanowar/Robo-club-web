//slider

const slide = {
                    main : null,
                    elementImg : null,
                    imgSelected : 0,
                    nextSlide: function (){
                        if (this.imgSelected != null)
                        {
                            if (this.imgSelected < (this.elementImg.length - 1))
                            {
                                this.imgSelected++;
                                this.normalizeSlide();
                            }
                        }
                    },
                    prevSlide: function (){
                        if (this.imgSelected != null)
                        {
                            if (this.imgSelected > 0)
                            {
                                this.imgSelected--;
                                this.normalizeSlide();
                            }
                        }
                    },
                    normalizeSlide: function (){

                        for (num = 0; num < this.elementImg.length; num++)
                        {
                            this.elementImg[num].classList.remove("hideLeft","prevLeftSecond","prev","selected","next","nextRightSecond","hideRight");
                        }

                        this.elementImg[this.imgSelected].classList.add("selected");

                        if (this.imgSelected > 2)
                        {
                            this.elementImg[this.imgSelected-2].classList.add("hideLeft");
                            this.elementImg[this.imgSelected-2].classList.add("prevLeftSecond");
                            this.elementImg[this.imgSelected-1].classList.add("prev");
                        }
                        else if (this.imgSelected > 1)
                        {
                            this.elementImg[this.imgSelected-2].classList.add("prevLeftSecond");
                            this.elementImg[this.imgSelected-1].classList.add("prev");
                        }
                        else if (this.imgSelected > 0)
                        {
                            this.elementImg[this.imgSelected-1].classList.add("prev");
                        }

                        if ((this.imgSelected + 3) < this.elementImg.length)
                        {
                            this.elementImg[this.imgSelected+3].classList.add("hideRight");
                            this.elementImg[this.imgSelected+2].classList.add("nextRightSecond");
                            this.elementImg[this.imgSelected+1].classList.add("next");
                        }
                        else if ((this.imgSelected + 2) < this.elementImg.length)
                        {
                            this.elementImg[this.imgSelected+2].classList.add("nextRightSecond");
                            this.elementImg[this.imgSelected+1].classList.add("next");
                        }
                        else if((this.imgSelected + 1) < this.elementImg.length)
                        {
                            this.elementImg[this.imgSelected+1].classList.add("next");
                        }
                    }
                }

                window.onload = () => {

                    slide.main = document.getElementById("carousel");
                    slide.elementImg = slide.main.getElementsByClassName("slideImg");

                    for (num = 0; num < slide.elementImg.length; num++)
                    {
                        slide.elementImg[num].setAttribute("img-number", num);
                        
                        slide.elementImg[num].addEventListener("click", (event) => {
                            slide.imgSelected = parseInt(event.target.parentElement.getAttribute("img-number"));
                            slide.normalizeSlide();
                        });

                        if (slide.elementImg[num].classList.contains("selected"))
                        {
                            slide.imgSelected = num;
                        }
                    }

                    document.getElementById("prev").addEventListener("click", () => {slide.prevSlide()});
                    document.getElementById("next").addEventListener("click", () => {slide.nextSlide()});

                }


//gallery

console.clear();

const elApp = document.querySelector("#app");

const elImages = Array.from(document.querySelectorAll(".gallery-image"));

const elDetail = document.querySelector(".detail");

function flipImages(firstEl, lastEl, change) {
  const firstRect = firstEl.getBoundingClientRect();

  const lastRect = lastEl.getBoundingClientRect();

  // INVERT
  const deltaX = firstRect.left - lastRect.left;
  const deltaY = firstRect.top - lastRect.top;
  const deltaW = firstRect.width / lastRect.width;
  const deltaH = firstRect.height / lastRect.height;

  change();
  lastEl.parentElement.dataset.flipping = true;

  const animation = lastEl.animate([
    {
      transform: `translateX(${deltaX}px) translateY(${deltaY}px) scaleX(${deltaW}) scaleY(${deltaH})`
    },
    {
      transform: 'none'
    }
  ], {
    duration: 600, // milliseconds
    easing: 'cubic-bezier(.2, 0, .3, 1)'
  });

  animation.onfinish = () => {
    delete lastEl.parentElement.dataset.flipping;
  }

}

elImages.forEach(figure => {

  figure.addEventListener("click", () => {
    const elImage = figure.querySelector('img');

    elDetail.innerHTML = "";

    const elClone = figure.cloneNode(true);
    elDetail.appendChild(elClone);

    const elCloneImage = elClone.querySelector('img');

    flipImages(elImage, elCloneImage, ()=>{
      elApp.dataset.state="detail";
    });

    function revert(){

      flipImages(elCloneImage, elImage, ()=>{
        elApp.dataset.state="gallery";
        elDetail.removeEventListener('click',revert);
      });

    }

    elDetail.addEventListener('click',revert);

  });
});