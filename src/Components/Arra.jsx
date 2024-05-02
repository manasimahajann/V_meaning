import React, {useState} from "react"

function Arra() {
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
	return (
		<div className="p-9">
			{arr.map((elem, i) => (
				<h1 key={i}>{elem}</h1>
			))}
			<button
				onClick={() => setArr([...arr, 88])}
				className="px-2 py-1 text-white rounded-md bg-sky-400 mr-"
			>
				Add
			</button>
			<button
				onClick={() => setArr(() => arr.filter((v, i) => v % 2 === 0))}
				className="px-2 py-1 text-white rounded-md bg-sky-400"
			>
				Change
			</button>
		</div>
	)
}

export default Arra
