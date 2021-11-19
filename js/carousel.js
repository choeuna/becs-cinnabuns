// querySelector will look for this in the document and return the first one
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children);
let trackWidth = track.getBoundingClientRect().width;
let slideWidth = slides[0].getBoundingClientRect().width;

// FUNCTIONS
const setSlidePosition = (width, slides) => {
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.left = width * i + 'px';
	}
}

const moveSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove('current-slide');
	targetSlide.classList.add('current-slide');
}

const moveDot = (currentIndex, targetIndex) => {
	dots[currentIndex].classList.remove('current-slide');
	dots[targetIndex].classList.add('current-slide');
}

const hideShowButtons = (targetIndex, prevButton, nextButton) => {
	if (targetIndex === 0) {
		prevButton.classList.add('is-hidden');
		nextButton.classList.remove('is-hidden');
	} else if (targetIndex === dots.length - 1) {
		prevButton.classList.remove('is-hidden');
		nextButton.classList.add('is-hidden');
	} else {
		prevButton.classList.remove('is-hidden');
		nextButton.classList.remove('is-hidden');
	};
}

// set the slide positions, adjust when window resizes
setSlidePosition(trackWidth, slides);

const resizeObserver = new ResizeObserver(_ => {
	trackWidth = track.getBoundingClientRect().width;
	setSlidePosition(trackWidth, slides)
});
resizeObserver.observe(document.querySelector('.carousel'));



// when click left, move slides to the left
prevButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;
	const currentIndex = slides.findIndex(slide => slide === currentSlide);
	const prevIndex = slides.findIndex(slide => slide === prevSlide);
	
	moveSlide(track, currentSlide, prevSlide); 
	moveDot(currentIndex, prevIndex);
	hideShowButtons(prevIndex, prevButton, nextButton);
});


// when click right, mode slides to the right
nextButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentIndex = slides.findIndex(slide => slide === currentSlide);
	const nextIndex = slides.findIndex(slide => slide === nextSlide);
	
	moveSlide(track, currentSlide, nextSlide); 
	moveDot(currentIndex, nextIndex);
	hideShowButtons(nextIndex, prevButton, nextButton);
});


// when click nav indicator, move to that slide
dotsNav.addEventListener('click', e => {
	const targetDot = e.target.closest('button'); 
	if (!targetDot) return;

	const currentSlide = track.querySelector('.current-slide');
	const currentDot = dotsNav.querySelector('.current-slide');
	const currentIndex = dots.findIndex(dot => dot === currentDot);
	const targetIndex = dots.findIndex(dot => dot === targetDot);

	moveSlide(track, currentSlide, slides[targetIndex]);
	moveDot(currentIndex, targetIndex);
	hideShowButtons(targetIndex, prevButton, nextButton);
});