// App.js
/* eslint-disable react/prop-types */
import {Link, Route, Routes} from "react-router-dom"
import Home from "./Components/Home"
import Show from "./Components/Show"
import About from "./Components/About"
import V from "./Components/V"

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

		// <div className="pt=[5%] pl-[5%]">
		// 	<nav className="m-2 p-2 flex justify-center gap-10">
		// 		<Link to="/">Home</Link>
		// 		<Link to="/about">About</Link>
		// 		<Link to="/show">Show</Link>
		// 	</nav>
		// 	<hr />
		// 	<Routes>
		// 		<Route path="/" element={<Home />} />
		// 		<Route path="/show" element={<Show />} />
		// 		<Route path="/about" element={<About />} />
		// 	</Routes>
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
