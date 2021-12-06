const Product = (props) => {
	return (
		<figure class='product'>
			<img class='product__img' src={props.src}></img>
			<figcaption>
				<h4 class='product__name'>{props.productName}</h4>
		  	</figcaption>
		</figure>
	);
};

const ProductsList = (props) => {
	const products = props.products.map(product => {
		return <Product productName={product.name} src={product.src}/>
	});
	return (
		<ul>{products}</ul>
	);
};

// load sweet products
ReactDOM.render(<ProductsList products={sweetProducts}/>, document.getElementById('product__sweet-content'));
// ReactDOM.render(<Product productName='test' src=''/>, document.getElementById('product__sweet-content'));