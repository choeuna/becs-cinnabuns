const ScrollButton = (props) => {
	let classes = 'carousel__button ' + props.carousel;
	if (props.direction === 'left') {
		classes += ' carousel__button--left is-hidden'
	} else if (props.direction === 'right') {
		classes += ' carousel__button--right'
	};

	return (
		<button class={classes} onClick={props.onClick}>
			<img name={props.direction} src={props.src} alt=''></img>
		</button>
		)
}

const Product = (props) => {
	return (
		<figure class='product'>
			<img class='product-img' src={props.src}></img>
			<figcaption>
				<h4 class='product-name'>{props.productName}</h4>
		  	</figcaption>
		</figure>
	)
}

const Slide = (props) => {
	const products = props.products.map(product => {
		return <Product productName={product.name} src={product.src}/>
	});

	return (
		<li class='carousel__slide'>{products}</li>
	)
}
//

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			figsPerSlide: 4,
			slideWidth: 0,
			currentSlide: 0,
			prevButton: null,
			nextButton: null,
			track: null
		};
		this.setSlideWidth = this.setSlideWidth.bind(this);
		this.carouselArrowClick = this.carouselArrowClick.bind(this);
		this.hideShowButtons = this.hideShowButtons.bind(this);
		this.moveSlide = this.moveSlide.bind(this);
	}

	componentDidMount() {
		this.setState({
			prevButton: document.querySelector('.carousel__button--left.' + this.props.id),
			nextButton: document.querySelector('.carousel__button--right.' + this.props.id),
			track: document.querySelector('ul.carousel__track.' + this.props.id)
		});
		this.setSlideWidth();
		window.addEventListener('resize', this.setSlideWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setSlideWidth);
	}

	setSlideWidth() {
		let oldWidth = this.state.slideWidth;
		let width = document.querySelector('.carousel__slide').getBoundingClientRect().width;
		this.setState({
			slideWidth: width
		});
		if (this.state.track) {
			let trackPosition = this.state.track.style.transform === '' ? 0 : parseInt(this.state.track.style.transform.match(/\d+/), 10);
			let page = trackPosition / oldWidth;
			let newPosition = width * page;
			this.moveSlide(trackPosition, newPosition);
		}
	}

	hideShowButtons(newPosition, max) {
		if (newPosition >= max) {
			this.state.nextButton.classList.add('is-hidden');
			this.state.prevButton.classList.remove('is-hidden');
		} else if (newPosition === 0) {
			this.state.prevButton.classList.add('is-hidden');
			this.state.nextButton.classList.remove('is-hidden');
		} else {
			this.state.nextButton.classList.remove('is-hidden');
			this.state.prevButton.classList.remove('is-hidden');
		};
	}

	carouselArrowClick(e) {
		let trackPosition = this.state.track.style.transform === '' ? 0 : parseInt(this.state.track.style.transform.match(/\d+/), 10);
		let newPosition;
		if (e.target.name == 'left') {
			newPosition = trackPosition - this.state.slideWidth;	
		} else {
			newPosition = trackPosition + this.state.slideWidth;
		};
		this.moveSlide(trackPosition, newPosition);
	}

	moveSlide(trackPosition, newPosition) {
		let count = this.props.products.length;
		let max = Math.ceil(count / this.state.figsPerSlide - 1) * this.state.slideWidth;

		if (newPosition < 0) {
			newPosition = 0;
		} else if (newPosition > max) {
			newPosition = max;
		}
		
		this.state.track.style.transform = 'translateX(-' + newPosition + 'px)';
		this.hideShowButtons(newPosition, max);
	}


	render() {
		let arr = [];
		let inArr = [];
		for (let i = 0; i < this.props.products.length; i++) {
			inArr.push(this.props.products[i]);
			if (((i + 1) % this.state.figsPerSlide == 0) ||
				(i == this.props.products.length - 1 && inArr != [])) {
				arr.push(inArr);
				inArr = []; 
			}
		}
		const slides = arr.map((slide, i) => {
			return <Slide products={slide}/>
		});

		
		const trackClasses = 'carousel__track ' + this.props.id;
		

		return (
			<div>
				<ScrollButton carousel={this.props.id} direction='left' src='media/left.svg' onClick={this.carouselArrowClick}/>
				<div class='carousel__track-container'>
					<ul class={trackClasses}>
						{slides}
					</ul>
				</div>
				<ScrollButton carousel={this.props.id} direction='right' src='media/left.svg' onClick={this.carouselArrowClick}/>
			</div>
			)
	}
}

let sweetProducts = [
	{name: 'Chai', src: 'media/bun01.png'},
	{name: 'Chocolate', src: 'media/bun01.png'},
	{name: 'Matcha', src: 'media/bun01.png'},
	{name: 'Ube', src: 'media/bun01.png'},
	{name: 'Earl Grey', src: 'media/bun01.png'},
	{name: 'ChocoFig', src: 'media/bun01.png'},
	{name: 'Apple Pie', src: 'media/bun01.png'},
	{name: 'Pumpkin', src: 'media/bun01.png'},
	{name: 'Fig', src: 'media/bun01.png'},
	{name: 'Smores', src: 'media/bun01.png'},
	{name: 'Custard', src: 'media/bun01.png'}
];

let savouryProducts = [
	{name: 'Garlic', src: 'media/bun01.png'},
	{name: 'Cheesy Garlic', src: 'media/bun01.png'},
	{name: 'Pesto', src: 'media/bun01.png'},
	{name: 'Pizza', src: 'media/bun01.png'},
	{name: 'Sundried Tomato', src: 'media/bun01.png'},
	{name: 'Rosemary', src: 'media/bun01.png'},
	{name: 'Potato', src: 'media/bun01.png'},
	{name: 'Mushroom', src: 'media/bun01.png'}
];
ReactDOM.render(<Carousel id='sweet-carousel' products={sweetProducts}/>, document.getElementById('sweet-carousel-container'));
ReactDOM.render(<Carousel id='savoury-carousel' products={savouryProducts}/>, document.getElementById('savoury-carousel-container'));


