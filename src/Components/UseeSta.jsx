import React, {useState} from "react"
import {FaArrowRight} from "react-icons/fa"

function UseeSta() {
	const [val, setVal] = useState(false)

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-60 h-32 relative rounded-md overflow-hidden flex">
				<img
					className={`shrink-0 ${
						val === false ? "-translate-x-[0%]" : "-translate-x-[100%]"
					} w-full h-full object-cover transition-transform`}
					src="https://plus.unsplash.com/premium_photo-1687181325045-c9dc3d462c5f?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				></img>
				<img
					className={`shrink-0 ${
						val === false ? "-translate-x-[0%]" : "-translate-x-[100%]"
					} w-full h-full object-cover transition-transform`}
					src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				></img>
				<span
					onClick={() => setVal(() => !val)}
					className="w-8 h-8 left-1/2 bottom-[8%] bg-[#dadada7b] absolute rounded-full -translate-x-[50%] flex items-center justify-center -translate-y-[50%]"
				>
					<FaArrowRight size={".8em"} />
				</span>
			</div>
		</div>
	)
}

export default UseeSta
