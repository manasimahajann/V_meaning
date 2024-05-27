import React, {useState} from "react"
import "./styles.css" // Import your CSS file with styles for the modal

function App() {
	const [showModal, setShowModal] = useState(false)

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<div className="app">
			<h1>React Pop-up Modal Example</h1>
			<button onClick={openModal}>Open Modal</button>
			{showModal && (
				<div className="modal-overlay">
					<div className="modal">
						<button className="close-modal" onClick={closeModal}>
							X
						</button>
						<h2>Modal Content</h2>
						<p>This is a simple pop-up modal in React.</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
