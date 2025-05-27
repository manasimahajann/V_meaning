import React, {useEffect, useState} from "react"
import {Tooltip} from "react-tooltip"
import {v4 as uuidv4} from "uuid"
import {FaMusic} from "react-icons/fa"
import {IoMdPause} from "react-icons/io"
import {BsArrowRepeat} from "react-icons/bs"
import {IconContext} from "react-icons"
import "../index.css"
import {useRef} from "react"
import FullVishnuSahasranam from "./FullVishnuSahasranam"

function V() {
	const [realData, setRealdata] = useState([])

	const [selectedItem, setSelectedItem] = useState(null)

	const [playing, setPlaying] = useState(false)
	const [repeat, setRepeat] = useState(false)
	const audioRef = useRef(null)

	const fetchOnOFFLineData = async () => {
		if (!navigator.onLine) {
			console.warn("You are offline. Please connect to the internet.")
			return
		}
		if (navigator.onLine) {
			try {
				const response = await fetch("/media/data1.json")
				if (response.ok) {
					const data = await response.json()
					// Process data
					setRealdata(data)
					// Store data in local storage
					localStorage.setItem("cachedData", JSON.stringify(data))
				} else {
					console.error("Network response was not ok.")
				}
			} catch (error) {
				console.error("Fetch error:", error)
			}
		}
	}

	useEffect(() => {
		localStorage.clear()

		// Check if data exists in local storage

		const cachedData = localStorage.getItem("cachedData")

		if (cachedData) {
			// Parse the cached data
			setRealdata(JSON.parse(cachedData))
		} else {
			// Fetch and save data if not cached
			fetchOnOFFLineData()
		}
	}, [])

	// Use map function here
	const verses = realData.map((verseData, index) => {
		const words = verseData.verse.split(/\s+/)

		const mappedValues = words.map((word, ind) => {
			const arthaind = ind + 1

			return {
				id: uuidv4(),
				word: word,
				artha: verseData.artha[arthaind],
			}
		})
		return mappedValues
	})

	// Fetch, save, and play audio from URL
	const saveAndPlayAudio = async (url, repeat = false) => {
		try {
			// Play audio directly from URL
			playAudio(url, repeat)
		} catch (error) {
			console.error("Error fetching audio:", error)
		}
	}
	const isValidUrl = (string) => {
		try {
			new URL(string)
			return true
		} catch (e) {
			return true
		}
	}
	const playAudio = (audioData, repeat) => {
		const isURL = isValidUrl(audioData)
		if (isURL) {
			audioRef.current = new Audio(audioData)
		}

		if (repeat) {
			audioRef.current.loop = true
		} else {
			//when the audio ends
			audioRef.current.onended = function () {
				console.log("Audio has ended")
				setPlaying(false)
				setRepeat(false)
				setSelectedItem(null)
				setRealdata(
					realData.map((verseData, index) => {
						return {...verseData, play: false}
					})
				)
			}
		}
		audioRef.current
			.play()
			.catch((error) => console.error("Error playing audio:", error))
	}

	const handleRepeat = (versenumber, ind, path) => {
		setPlaying(false)
		setRepeat(!repeat)
		handleItemClick(ind)

		//when both the buttons are pressed make sure that play stops and repeat plays
		//on and off if button is pressed multiple times
		setRealdata((prev) => {
			return prev.map((verse, index) => {
				if (verse.number === versenumber) {
					return {...verse, repeat: !verse.repeat, play: false} //at once if play and pause are clicked only one plays
				}
				return {...verse, repeat: false, play: false} // multiple buttons clicked only one plays
			})
		})

		if (repeat === false && playing === false) {
			// playAudio(path, true)

			saveAndPlayAudio(path, true)
		} else {
			//console.log("stop repeating...")
			setPlaying(false)
			setRepeat(false)
			setSelectedItem(null)
			stopAudio(path)
		}
	}

	const handleMusicClick = (versenumber, ind, path) => {
		setPlaying(!playing)

		setRepeat(false)
		handleItemClick(ind)

		//when both the buttons are pressed make sure that repeat stops and play plays

		setRealdata((prev) => {
			return prev.map((item, ind) => {
				if (item.number === versenumber) {
					// alert(!item.play.toString())

					return {...item, play: !item.play, repeat: false} //at once if play and pause are clicked only one plays
				}
				return {...item, play: false, repeat: false} // multiple buttons clicked only one plays
			})
		})

		if (playing === false && repeat === false) {
			saveAndPlayAudio(path, false)
		} else {
			// console.log("stop playing...")
			setPlaying(false)
			setRepeat(false)
			setSelectedItem(null)

			stopAudio(path)
		}
	}

	const stopAudio = () => {
		if (audioRef.current) {
			audioRef.current.pause()

			audioRef.current.currentTime = 0
		}
	}

	const handleItemClick = (index) => {
		//setSelectedItem(index)
		// Check if the clicked item is already selected

		if (selectedItem === index) {
			// If yes, deselect it by setting selectedItem to null

			setSelectedItem(null)
		} else {
			// If no, select the clicked item by updating selectedItem to its index

			setSelectedItem(index)
		}
	}
	const handleContainerClick = (realData) => {
		if (selectedItem !== null) {
			setSelectedItem(null)
			if (playing || repeat) {
				setPlaying(false)
				setRepeat(false)
				stopAudio()
				const updatedData = realData.map((item) => ({
					...item,
					play: false,
					repeat: false,
				}))

				setRealdata(updatedData)
			}
		}
	}

	return (
		<>
			<div id="heading">॥ श्रीविष्णुसहस्रनामस्तोत्रम् ॥</div>

			<FullVishnuSahasranam
				data={realData}
				saveAndPlayAudio={saveAndPlayAudio}
				playAudio={playAudio}
			/>
			<div
				onClick={() => handleContainerClick(realData)}
				className={`main ${
					(playing || repeat) && selectedItem !== null ? "blurred" : ""
				}`}
			>
				<div className="list">
					{realData.map((verseData, ind) => (
						<div
							key={ind}
							className={`item ${
								(playing || repeat) && selectedItem === ind ? "selected" : ""
							}`}
						>
							<div key={ind}>
								{verses[ind].map((word, wordIndex) =>
									word.word.includes("।") ? (
										<>
											<a id={"ind" + word.id} key={wordIndex}>
												{word.word}
												<br />
											</a>
											{selectedItem === null ? (
												<Tooltip
													key={"asdf" + wordIndex}
													anchorSelect={`${"#ind" + word.id}`}
													className={`${"#" + wordIndex}`}
												>
													{word.artha !== undefined ? (
														<div className="tooltip-content">{word.artha}</div>
													) : null}
												</Tooltip>
											) : null}
										</>
									) : (
										<>
											<a id={"ind" + word.id} key={wordIndex}>
												{word.word}&nbsp;
											</a>
											{selectedItem === null ? (
												<Tooltip
													key={"asdf" + wordIndex}
													anchorSelect={`${"#ind" + word.id}`}
													className={`${"#" + wordIndex}`}
												>
													{word.artha !== undefined ? (
														<div className="tooltip-content">{word.artha}</div>
													) : null}
												</Tooltip>
											) : null}
										</>
									)
								)}
								<div className="play-music">
									{
										/*!repeat && */ <span
											onClick={() =>
												handleMusicClick(verseData.number, ind, verseData.path)
											}
										>
											{verseData.play ? <IoMdPause /> : <FaMusic />}
										</span>
									}
									{
										/*!playing && */ <span
											onClick={() =>
												handleRepeat(verseData.number, ind, verseData.path)
											}
											className="ml-5"
										>
											{verseData.repeat ? (
												<IconContext.Provider
													value={{
														color: "green",
														className: "global-class-name",
													}}
												>
													<BsArrowRepeat />
												</IconContext.Provider>
											) : (
												<BsArrowRepeat />
											)}
										</span>
									}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default V
