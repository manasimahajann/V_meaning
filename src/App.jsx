// App.js
/* eslint-disable react/prop-types */
import React, {useState} from "react"
import V from "./Components/V"
import Card from "./Components/Card"
import Cards from "./Components/Cards"
import Form from "./Components/Form"

const App = () => {
	// const [users, setUsers] = useState([
	// 	{
	// 		name: "Manasi",
	// 		email: "asdf@gmail.com",
	// 		img: "https://images.unsplash.com/photo-1709491135369-4b65470fc8ae?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	},
	// 	{},
	// ])

	// const handleFormSubmitData = (data) => {
	// 	setUsers([...users, data])
	// }

	// const handleRemoveItem = (id) => {
	// 	setUsers(() => users.filter((user, index) => user.email !== id))
	// }
	return (
		// <div className={`container ${selectedItem !== null ? "blurred" : ""}`}>
		// 	{[1, 2, 3, 4, 5].map((item, index) => (
		// 		<div
		// 			key={index}
		// 			className={`item ${selectedItem === index ? "selected" : ""}`}
		// 			onClick={() => handleItemClick(index)}
		// 		>
		// 			Item {item}
		// 		</div>
		// 	))}
		// </div>
		<V></V>

		// <div className="w-full h-screen bg-zinc-200">
		// 	<div className="container mx-auto  flex items-center justify-center">
		// 		<Cards users={users} handleRemoveItem={handleRemoveItem} />
		// 		<Form handleFormSubmitData={handleFormSubmitData} />
		// 	</div>
		// </div>
	)
}

export default App
