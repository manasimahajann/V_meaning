/* eslint-disable react/prop-types */
import React from "react"
import {useForm} from "react-hook-form"

function Form({handleFormSubmitData, handleRemoveItem}) {
	const {register, handleSubmit, reset} = useForm()
	const handleFormSubmit = (data) => {
		handleFormSubmitData(data)
		reset()
	}
	return (
		<div className="mt-10 flex justify-center gap-2">
			<form
				action=""
				className="flex gap-10"
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<input
					{...register("name")}
					className="rounded-md px-2 py-1 text-base font-semibold outline-none"
					placeholder="name"
					type="text"
				></input>
				<input
					{...register("email")}
					className="rounded-md px-2 py-1 text-base font-semibold outline-none"
					placeholder="email"
					type="text"
				></input>
				<input
					{...register("img")}
					className="rounded-md px-2 py-1 text-base font-semibold outline-none"
					placeholder="image url"
					type="text"
				></input>
				<button
					className="rounded-md px-5 py-1 mt-1 bg-blue-500 text-white"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Form
