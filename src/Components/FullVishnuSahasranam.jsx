import React, {useState, useRef, useEffect} from "react"
import PropTypes from "prop-types"
import {IoMdPause} from "react-icons/io"
import {FaMusic} from "react-icons/fa"

const CHUNK_SIZE = 1024 * 1024 // 1MB chunk size for fetching

const FullVishnuSahasranam = ({data}) => {
	const [currentLyric, setCurrentLyric] = useState([])
	const [isPlaying, setIsPlaying] = useState(false)
	const [active, setActive] = useState(false)
	const [isEnded, setEnded] = useState(false)
	const [audioUrl, setAudioUrl] = useState(null)
	const [isFetching, setIsFetching] = useState(false)
	const isAnyPlayTrue = data.some(
		(item) => item.play === true || item.repeat === true
	)
	const audioRef = useRef(null)

	const lyricsData = [] // Your lyrics data here

	const openDatabase = () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open("AudioDatabase", 1)

			request.onupgradeneeded = (event) => {
				const db = event.target.result
				if (!db.objectStoreNames.contains("audioChunks")) {
					db.createObjectStore("audioChunks", {keyPath: "id"})
				}
			}

			request.onsuccess = (event) => {
				resolve(event.target.result)
			}

			request.onerror = (event) => {
				reject(event.target.error)
			}
		})
	}

	const fetchData = async (id) => {
		const db = await openDatabase()
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(["audioChunks"], "readonly")
			const store = transaction.objectStore("audioChunks")
			const request = store.get(id)

			request.onsuccess = (event) => {
				resolve(event.target.result)
			}

			request.onerror = (event) => {
				reject(event.target.error)
			}
		})
	}

	const fetchAndStoreAudioInChunks = async (id, url) => {
		try {
			const response = await fetch(url)
			const reader = response.body.getReader()
			let receivedLength = 0
			let chunks = []

			while (true) {
				const {done, value} = await reader.read()
				if (done) break
				chunks.push(value)
				receivedLength += value.length

				if (receivedLength >= CHUNK_SIZE || done) {
					const db = await openDatabase()
					const transaction = db.transaction(["audioChunks"], "readwrite")
					const store = transaction.objectStore("audioChunks")

					transaction.oncomplete = () => {
						console.log("Transaction completed.")
					}

					transaction.onerror = (event) => {
						console.error("Transaction error:", event.target.error)
					}

					const chunkBlob = new Blob(chunks, {type: "audio/m4a"})
					await new Promise((resolve, reject) => {
						const putRequest = store.put({id, audioData: chunkBlob})

						putRequest.onsuccess = () => {
							resolve()
						}

						putRequest.onerror = (event) => {
							reject(event.target.error)
						}
					})

					chunks = []
				}
			}
		} catch (error) {
			console.error("Error saving audio data:", error)
		}
	}

	useEffect(() => {
		const initializeAudio = async () => {
			const audioFetchUrl =
				"https://testapi1test.blob.core.windows.net/media/0.m4a"

			try {
				const data = await fetchData("111")
				if (data) {
					const audioBlob = new Blob([data.audioData], {type: "audio/m4a"})
					const url = URL.createObjectURL(audioBlob)
					setAudioUrl(url)
					audioRef.current = new Audio(url)
				} else {
					setAudioUrl(audioFetchUrl)
					audioRef.current = new Audio(audioFetchUrl)
					setIsFetching(true)

					// Fetch and save the audio data in the background
					fetchAndStoreAudioInChunks("111", audioFetchUrl).then(() =>
						setIsFetching(false)
					)
				}
			} catch (error) {
				console.error("Error initializing audio:", error)
				setAudioUrl(audioFetchUrl)
				audioRef.current = new Audio(audioFetchUrl)
				setIsFetching(true)

				// Fetch and save the audio data in the background
				fetchAndStoreAudioInChunks("111", audioFetchUrl).then(() =>
					setIsFetching(false)
				)
			}
		}

		initializeAudio()
	}, [])

	useEffect(() => {
		if (audioRef.current) {
			const audioElement = audioRef.current

			const handleTimeUpdate = () => {
				const currentTime = audioElement.currentTime
				const currentLyricData = lyricsData.find(
					(lyric, index) =>
						currentTime >= lyric.time &&
						(index === lyricsData.length - 1 ||
							currentTime < lyricsData[index + 1].time)
				)

				if (currentLyricData) {
					setCurrentLyric(currentLyricData.text)
				}
			}

			audioElement.addEventListener("timeupdate", handleTimeUpdate)

			return () => {
				audioElement.removeEventListener("timeupdate", handleTimeUpdate)
			}
		}
	}, [audioRef.current])

	const handlePlayPause = () => {
		const audioElement = audioRef.current

		if (isPlaying) {
			audioElement.pause()
			audioElement.currentTime = 0 // Reset the audio to the beginning
			setIsPlaying(false)
			setEnded(true)
		} else {
			setEnded(false)
			audioElement.play()
			setIsPlaying(true)
		}

		setIsPlaying(!isPlaying)
		setActive(!active) // Toggle active state

		audioElement.onended = () => {
			setIsPlaying(false)
			setActive(false)
			setEnded(true)
		}
	}

	return (
		<div className={`main ${isPlaying ? "fullscreen" : ""}`}>
			{audioUrl && <audio ref={audioRef} src={audioUrl} />}

			<div
				className={`item flex flex-col gap-3 lyrics ${
					active ? "selected" : ""
				} ${isAnyPlayTrue ? "blurred" : ""}`}
			>
				{currentLyric.length === 0 || isEnded ? (
					<div className="m-auto">
						<p>॥ श्रीविष्णुसहस्रनामस्तोत्रम् ॥</p>
						<p>&nbsp;&nbsp;&nbsp;(स्वामी वरदानंद भारती)</p>
					</div>
				) : (
					currentLyric.map((line, index) => (
						<div className="m-auto h-[90%]" key={index}>
							<p key={index}>{line}</p>
						</div>
					))
				)}
				<button onClick={handlePlayPause} className="mb-1 h-[10%] self-center">
					{isPlaying ? <IoMdPause /> : <FaMusic />}
				</button>
			</div>
		</div>
	)
}

// PropTypes validation for props
FullVishnuSahasranam.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			number: PropTypes.string.isRequired,
			play: PropTypes.bool.isRequired,
			repeat: PropTypes.bool.isRequired,
			path: PropTypes.string.isRequired,
			verse: PropTypes.string.isRequired,
			artha: PropTypes.object.isRequired, // Assuming artha is an object with specific structure
		})
	).isRequired,
}

export default FullVishnuSahasranam
