import React, {useState} from "react"

function States() {
	const [user, setUser] = useState({
		name: "Manasi",
		age: 23,
		email: "manasi@gmail.com",
		isBanned: false,
	})

	return (
		<div className="p-4">
			<h1>Name: {user.name}</h1>
			<h1>Age: {user.age}</h1>
			<h1>Email: {user.email}</h1>
			<h1>Allowed: {user.isBanned.toString()}</h1>
			<button
				onClick={() =>
					setUser({
						...user,
						name: "Neha",
						age: 22,
						email: "asd@asdf.com",
						isBanned: true,
					})
				}
				className={`px-2 py-2 ${
					user.isBanned ? "bg-blue-500" : "bg-red-500"
				} text-white mt-3`}
			>
				change
			</button>
		</div>
	)
}

export default States
