import React, {useState} from "react"
function PropsUse({values, handleFriends, index}) {
	const {name, profession, age, img, friend} = values

	return (
		<div className="w-52 bg-white-300 rounded-md overflow-hidden">
			<div className="w-full h-32 bg-sky-200">
				<img className="w-full h-full object-cover" src={img}></img>
			</div>
			<div className="w-full p-3">
				<h3 className="w-full font-semibold">
					{name},{age}
				</h3>
				<h5 className="w-full text-xs">{profession}</h5>
				<button
					onClick={() => handleFriends(index)}
					className={`px-3 py-1 text-xs text-white ${
						friend ? "bg-green-600" : "bg-blue-600"
					} rounded-md mt-3`}
				>
					{friend ? "Added" : "Add friend"}
				</button>
			</div>
		</div>
	)
}

export default PropsUse
