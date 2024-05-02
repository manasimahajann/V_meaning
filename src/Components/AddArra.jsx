import React, {useState} from "react"

export default function AddArra() {
	const [data, setData] = useState([
		{name: "Manasi", age: 14},
		{name: "Neha", age: 34},
		{name: "Rama", age: 4},
		{name: "Krishna", age: 0},
	])
	return (
		<div className="p-5">
			{data.map((item, ind) => (
				<div key={ind}>
					<h1>Name: {item.name}</h1>
					<h1>Age: {item.age}</h1>
				</div>
			))}
			<button
				onClick={() =>
					setData(
						data.map((item, index) =>
							item.name === "Neha" ? {name: "Neha", age: 24} : item
						)
					)
				}
				className="px-3 py-1 bg-sky-500 text-white rounded-full m-3"
			>
				Add
			</button>
		</div>
	)
}
