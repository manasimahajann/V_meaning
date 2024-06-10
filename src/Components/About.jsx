import React, {useEffect, useState} from "react"
import axios from "../utils/axios"

function About() {
	const [first, setFirst] = useState("this is normal data")
	const [sec, setSec] = useState("this is very important data")
	const [users, setUsers] = useState("")
	const getUsers = () => {
		const api = "/users/"

		axios
			.get(api)
			.then((users) => {
				console.log(users.data)
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		getUsers()
		console.log("Service component is created")
		return () => {
			console.log("Sevice componet is deleted")
		}
	}, [sec])
	return (
		<div>
			<h1>{first}</h1>
			<button
				onClick={() => setFirst("Normal Data has been changed")}
				className="px-3 py-3 bg-red-200 mb-10"
			>
				Change normal data
			</button>

			<h1>{sec}</h1>
			<button
				onClick={() => setSec("Important Data has been changed")}
				className="px-3 py-3 bg-red-200"
			>
				Change important data
			</button>
		</div>
	)
}

export default About
