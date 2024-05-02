import React from "react"
import {Tooltip} from "react-tooltip"
const data = [
	{word: "Hi", meaning: "Hello"},
	{word: "Hello", meaning: "Hi"},
	{word: "Namaste", meaning: "Namaskar"},
	{word: "ok", meaning: "Ok!!"},
]
function TooltipT() {
	return (
		<div className="p-10 m-1">
			{data.map((val, ind) => (
				<>
					<a key={ind} id={"ind" + ind}>
						{val.word} &nbsp;
					</a>
					<Tooltip anchorSelect={`${"#ind" + ind}`}>
						<p>{val.meaning}</p>
					</Tooltip>
				</>
			))}
			<a>◕‿‿◕</a>
			<a>◕‿‿◕</a>
			<a className="my-anchor-element">◕‿‿◕</a>
			<a className="my-anchor-element">◕‿‿◕</a>
			<a className="my-anchor-element">◕‿‿◕</a>
			<a id="not-clickable">Hello</a>
			<Tooltip anchorSelect="#not-clickable">
				<p>Hello World!</p>
			</Tooltip>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<a id="not-clickable">Hello</a>
			<Tooltip anchorSelect="#not-clickable">
				<p>Hello World!</p>
			</Tooltip>{" "}
			&nbsp;
			<a id="clickable">◕‿‿◕</a>
			<Tooltip anchorSelect="#clickable" clickable>
				<button>You can click me!</button>
			</Tooltip>
		</div>
	)
}

export default TooltipT
