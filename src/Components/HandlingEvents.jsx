import React from "react"

function HandlingEvents() {
	const data = [
		{
			song: "I walk a lonely road",
			description: "I walk a path lorem1 asdf asdffaasffa asfdfadfasd asdffds",
		},
		{
			song: "Party",
			description: "Lorem1 asdf asdffaasffa asfdfadfasd asdffds",
		},
		{
			song: "The Sun is up",
			description: "lorem10 asdf asdsffa asf asdffds dfadfasd",
		},
	]
	const handleClickDownload = () => {
		alert("Downloading")
	}

	return (
		<div className="w-full h-screen bg-zinc-300 flex flex-col gap-6 items-center justify-center">
			{data.map((val, index) => (
				<div key={index} className="song w-60 px-3 py-2 bg-zinc-100">
					<h3 className="font-semibold text-xl"> {val.song}</h3>
					<p className="text-sm mt-2">{val.description}</p>
					<button
						onClick={handleClickDownload}
						className="px-2 py-1 bg-sky-400 text-xs text-zinc-200 font-semibold mt-4 rounded-md"
					>
						Download Now
					</button>
				</div>
			))}
		</div>
	)
}

export default HandlingEvents
