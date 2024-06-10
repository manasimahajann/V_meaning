import React, {useState} from "react"
import axios from "axios"
import {SiPrdotco} from "react-icons/si"
import Show from "./Show"
function APIInttegration() {
	return (
		<div className="pt-[5%] pl-[5%]">
			<br />
			<br />
			<button className="px-5 py-2 bg-red-300" onClick={addProducts}>
				Add product
			</button>

			<hr className="my-10" />
			<Show />
		</div>
	)
}

export default APIInttegration
