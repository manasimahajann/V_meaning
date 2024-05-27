/* eslint-disable react/prop-types */
import React from "react"

function Card({user, handleRemoveItem, key}) {
	return (
		<div className="w-64 bg-zinc-100 rounded-lg flex items-center flex-col p-2">
			<div className="image w-20 h-20">
				<img
					className="w-full h-full object-cover rounded-full"
					src={user.img}
				/>
			</div>
			<h1 className="text-center text-xl font-bold mt-1">{user.name}</h1>
			<h4 className="opacity-70 text-xs font-semibold">{user.email}</h4>
			<p className="text-center text-xs font-semibold leading-1 tracking-tight mt-2 text-wrap">
				sdfg
			</p>
			<button
				className="px-3 py-1 bg-red-600 text-xs rounded-md text-white mt-2"
				onClick={() => handleRemoveItem(user.email)}
			>
				{" "}
				Remove it
			</button>
		</div>
	)
}

export default Card
