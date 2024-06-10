import React, {useEffect, useState} from "react"
import axios from "../utils/axios"

function Show() {
	const [products, setProducts] = useState([])
	const getProducts = () => {
		const api = "/products/"

		axios
			.get(api)
			.then((products) => {
				setProducts(products.data)
			})
			.catch((err) => console.log(err))
	}
	useEffect(() => {
		console.log("mounted")
		getProducts()
	}, [])
	return (
		<>
			<ul>
				{products.length > 0 ? (
					products.map((product) => (
						<li key={product.id} className=" p-5 bg-red-200 rounded m-5">
							{product.title}
						</li>
					))
				) : (
					<h1>Loading...</h1>
				)}
			</ul>
		</>
	)
}

export default Show
