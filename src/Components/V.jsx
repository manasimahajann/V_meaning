import React, {useEffect, useState} from "react"
import {Tooltip} from "react-tooltip"
import {v4 as uuidv4} from "uuid"
import {FaMusic} from "react-icons/fa"
import {IoMdPause} from "react-icons/io"
import {BsArrowRepeat} from "react-icons/bs"
import {IconContext} from "react-icons"
import "../index.css"
import {useRef} from "react"
import axios from "axios"
import FullVishnuSahasranam from "./FullVishnuSahasranam"

const dbName = "AudioDatabase"
const dbVersion = 1
let db
function V() {
	const [realData, setRealdata] = useState([])

	const [selectedItem, setSelectedItem] = useState(null)

	const [playing, setPlaying] = useState(false)
	const [repeat, setRepeat] = useState(false)
	const audioRef = useRef(null)

	const [isDbOpen, setIsDbOpen] = useState(false)

	useEffect(() => {
		openDatabase()
			.then(() => setIsDbOpen(true))
			.catch((error) => console.error("Error opening database:", error))
		// Check if data exists in local storage

		const cachedData = localStorage.getItem("cachedData")

		if (cachedData) {
			// Parse the cached data
			setRealdata(JSON.parse(cachedData))
		} else {
			// Fetch and save data if not cached
			fetch(
				"https://testapi1test.blob.core.windows.net/media/VishnuSahasranam.json"
			)
				.then((response) => response.json())
				.then((data) => {
					setRealdata(data)
					// Store data in local storage
					localStorage.setItem("cachedData", JSON.stringify(data))
				})
				.catch((error) => console.error("Fetch error:", error))
		}
	}, [])
	// Open or create IndexedDB database
	const openDatabase = () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName, dbVersion)

			request.onerror = (event) =>
				reject(`IndexedDB error: ${event.target.errorCode}`)

			request.onsuccess = (event) => {
				db = event.target.result

				resolve(db)
			}

			request.onupgradeneeded = (event) => {
				db = event.target.result
				db.createObjectStore("audioChunks", {keyPath: "id"})
			}
		})
	}
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
	const saveAndPlayAudio = async (id, url, repeat = false) => {
		try {
			if (!isDbOpen || !db) {
				console.log("Error initializing the db")
			}

			const transaction = db.transaction(["audioChunks"], "readwrite")
			const store = transaction.objectStore("audioChunks")
			const request = store.get(id)

			request.onsuccess = async (event) => {
				if (event.target.result) {
					if (id !== "111") {
						//coming from FV
						// Audio already exists, play it
						playAudio(event.target.result.audioData, repeat)
					}
				} else {
					// Fetch audio, store it, and then play it
					const response = await fetch(url)
					if (response.ok) {
						const audioData = await response.arrayBuffer()
						const newTransaction = db.transaction(["audioChunks"], "readwrite")
						const newStore = newTransaction.objectStore("audioChunks")
						newStore.put({id, audioData})

						//FV is coming from fullVS file where if true we just want to save the data to indexdb
						newTransaction.oncomplete = () => playAudio(audioData, repeat)
						newTransaction.onerror = (event) =>
							console.error("IndexedDB write error:", event.target.error)
					}
				}
			}
			request.onerror = (event) =>
				console.error("IndexedDB read error:", event.target.error)
		} catch (error) {
			console.error("Error fetching audio:", error)
		}
	}

	const playAudio = (audioData, repeat) => {
		const audioBlob = new Blob([audioData], {type: "audio/m4a"})
		const audioUrl = URL.createObjectURL(audioBlob)
		audioRef.current = new Audio(audioUrl)

		if (repeat) {
			audioRef.current.loop = true
		} else {
			//when the audio ends
			audioRef.current.onended = function () {
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

			saveAndPlayAudio(ind, path, true)
		} else {
			//console.log("stop repeating...")
			setPlaying(false)
			setRepeat(false)
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
			saveAndPlayAudio(ind, path, false)
		} else {
			// console.log("stop playing...")
			setPlaying(false)
			setRepeat(false)
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
