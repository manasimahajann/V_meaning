import React from "react"

function Map() {
	const data = ["Hearsh", "NIshi", "Rama"]
	return (
		<div>
			{data.map((val, index) => (
				<div key={index} className="px-3 py-4 bg-zinc-400 m-2 rounded-md w-fit">
					<h1>{val}</h1>
				</div>
			))}
		</div>
	)
}

export default Map
