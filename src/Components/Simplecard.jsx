import React from "react"
function Simplecard() {
	const data = [
		{
			image:
				"https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?q=80&w=2392&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			name: "Amazon Basics",
			description:
				"lorem21 is Lorem ipsum dolor sit amet, consectet dolore magna",
			instock: false,
		},
		{
			image:
				"https://images.unsplash.com/photo-1604605801370-3396f9bd9cf0?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			name: "Non-daily Basics",
			description:
				"lorem21 is Lorem ipsum dolor sit amet, consectet dolore magna",
			instock: false,
		},
		{
			image:
				"https://images.unsplash.com/photo-1522780550166-284a0288c8df?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			name: "Daily Basics",
			description:
				"lorem21 is Lorem ipsum dolor sit amet, consectet dolore magna",
			instock: true,
		},
	]
	return (
		<div className="w-full h-screen bg-zinc-200 flex flex-row items-center justify-center gap-10 ">
			{data.map((value, index) => (
				<div
					key={index}
					className="w-52 bg-zinc-100 rounded-md overflow-hidden"
				>
					<div>
						<div className="w-full h-32 bg-zinc-300">
							<img className="w-full h-full object-cover" src={value.image} />
						</div>
						<div className="w-full px-3 py-4">
							<h2 className="text-base font-semibold">{value.name}</h2>
							<p className="text-xs mt-2">{value.description}</p>
							<button
								className={`px-3 py-1 ${
									value.instock ? "bg-sky-500" : "bg-red-500"
								} text-xs mt-2 rounded-full text-zinc-100`}
							>
								{value.instock ? "Know More" : "Out of stock"}
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
export default Simplecard
