
export const Product = ({ product, setCurrentProduct }) => {

	return (
		<div onClick={() => setCurrentProduct(product)} className="aspect-square relative flex flex-col items-center justify-center bg-slate-400 rounded overflow-hidden">

			<div className="relative mx-auto w-full shadow rounded bg-white h-48">
				{product.category === 'smartphones' &&
					<span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
						Special Offer
					</span>
				}
				<div className="absolute inset-0"><img src={product.thumbnail} className="absolute object-cover w-full h-full z-0" /></div>
			</div>

			<div>
				<h2 className="font-medium text-base text-gray-800 line-clamp-1">
					{product.title}
				</h2>
				<p className="mt-2 text-sm text-gray-800 line-clamp-1">
					{product.description}
				</p>
			</div>

			<div className="p-1">
				<p className="inline-block font-medium text-primary whitespace-nowrap leading-tight rounded-xl">
					${product.price}
				</p>
				<button onClick={() => setCurrentProduct(product)} className="w-5/6 bg-gray-900 text-white py-2 px-4 rounded-full font-bold mt-4 mx-auto">En savoir plus</button>
			</div>
		</div>

	)
}

export default Product