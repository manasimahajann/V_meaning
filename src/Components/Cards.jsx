/* eslint-disable react/prop-types */
import React from "react"
import Card from "./Card"

function Cards({users, handleRemoveItem}) {
	return (
		<div className="w-full  h-96  max-h-96 overflow-auto bg-sky-100 p-4 flex justify-center gap-4 flex-wrap">
			{users.map((item, index) => {
				return (
					<Card user={item} key={index} handleRemoveItem={handleRemoveItem} />
				)
			})}
		</div>
	)
}

export default Cards
