import React, {useCallback, useEffect, useState} from "react"
import Move from "./Move"
import {Tooltip} from "react-tooltip"
import {v4 as uuidv4} from "uuid"
// import data from "../../data1.json"
import {FaMusic} from "react-icons/fa"
import {IoMdPause} from "react-icons/io"
import {BsArrowRepeat} from "react-icons/bs"
import {IconContext} from "react-icons"
import "../index.css"
import {IoConstructOutline} from "react-icons/io5"
import {useRef} from "react"
import axios from "axios"
import {object} from "prop-types"

function V() {
	// const data = [
	// 	{
	// 		number: "1",
	// 		verse:
	// 			"ॐविश्वं विष्णुर् वषट्कारो भूतभव्यभवत्प्रभुः ।\n भूतकृद् भूतभृद् भावो भूतात्मा भूतभावनः ॥१॥",
	// 		artha: {
	// 			1: "ॐ विश्वं - सर्व विश्वाचे जो कारण आहे वा जो स्वतःच विश्वरूपाने नटटेला आहे, वा जो या सर्व दिसणाऱ्या भासणाऱ्या, असणाऱ्या विश्वामध्ये ओतप्रोत भरून राहिला आहे, वा विश्वाच्या उत्पत्तिला, स्थितीला आणि प्रलयाला जो एकमात्र कारण आहे. म्हणजे हे विश्च ज्याच्यातून उत्पन्न होते, ज्याचे ठिकाणी नांदते आणि अंती ज्याच्यामध्ये विलिन होते. तो.",
	// 			2: "विष्णुः - सर्व विश्वाचे जो कारण आहे\n वा जो स्वतःच विश्वरूपाने नटटेला आहे, वा जो या सर्व दिसणाच्याभासणाच्या, असणाच्या विश्वामध्ये ओतप्रोत भरून राहिला आहे, वा विश्वाच्या उत्पत्तिला ,स्थितीला आणिप्रलयाला जो एकमात्र कारण आहे.",
	// 			3: "वषट्कार - यज्ञामध्ये वषट् ही क्रिया ज्याला उद्देशून केली जाते तो, किंवा यज्ञामध्ये केली जाणारी वषट्क्रिया हेच ज्याचे स्वरूप आहे, कारण यज्ञ हाच विष्णू आहे(यज्ञो वै विष्णुः) असे तैतरिय उपनिषदात सांगितले आहे.",
	// 			4: "भूतभव्यभवत्प्रभुः - भूत म्हणजे झालेले, भव्य म्हणजे भविष्यकाली अस्तित्वात येणारे आणि भवत् म्हणजे वर्तमानकाली असलेले अशा तिन्ही कालातील वस्तुजातावर ज्याची सत्ता आहे.",
	// 			5: "",
	// 			6: "भूतकृत् - रजोगुणाचा आश्रय घेऊन ब्रह्मकदेवाच्या रूपाने जो भूताची म्हणजे उत्पन्न होणान्या सर्व वस्तूंची रचना करतो किंवा कृत् यामध्ये कृन्त धातु गृहीत धरला तर जो तमोगुणाचा आश्रय करून रुद्ररूपाने सर्व उत्पन्न झालेल्यांचा म्हणजे भूतांचा नाश करतो, संहार करतो.",
	// 			7: "भूतभृत् - सत्वगुणांचा आश्रय करून जो सर्व भूतांचे भरण म्हणजेच धारण, पालनपोषण करतो",
	// 			8: "भाव - निर्माण होणे, जन्माला येणे वा अस्तित्व असणे हे दोन्ही भू धातूपासून होणाऱ्या भाव शब्दाचे अर्थ आहेत. त्यामुळे जो विश्वरूपाने, प्रपंचरूपाने उत्पन्न होतो, जगणे, वाढणे  इत्यादी  कोणत्याहि  विकारावाचून, कोणत्याही अपेक्षेवाचून, उपाधीवाचून, ज्याला अस्तित्व असते. प्रेम, श्रद्धा.",
	// 			9: "भूतात्मा - जो सर्व भूतांचा आत्मा आहे. म्हणजे जो अंतर्यामी आहे. ",
	// 			10: "भूतभावन: - जो भूतांची  स्वरूपे , रचना , गुणविशेष , आकार इत्यादी कसे असावेत हे निश्चित करतो.",
	// 		},
	// 		play: false,
	// 		repeat: false,
	// 		path: "https://vsmusic.s3.us-east-2.amazonaws.com/1.m4a",
	// 	},
	// ]

	const [realData, setRealdata] = useState([])

	const api = "https://vsmusic.s3.us-east-2.amazonaws.com/data1.json"

	const fetchData = async () => {
		await axios
			.get(api)
			.then((info) => {
				setRealdata(JSON.parse(JSON.stringify(info.data)))
			})
			.catch((err) => console.log(err))
	}
	useEffect(() => {
		fetchData()

		console.log("Component is created")
		// return () => {
		// 	console.log("Service component is deleted")
		// }
	}, [])

	const [selectedItem, setSelectedItem] = useState(null)

	const [playing, setPlaying] = useState(false)
	const [repeat, setRepeat] = useState(false)
	const audioRef = useRef(null)

	console.log("readdata " + realData)

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

	const handleRepeat = (versenumber, ind, path) => {
		setPlaying(false)
		setRepeat(!repeat)
		handleItemClick(ind)
		// let path = `src/media/${ind + 1}.m4a`

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
			//console.log(" repeating...")
			playAudio(path, true)
		} else {
			//console.log("stop repeating...")
			setPlaying(false)
			setRepeat(false)
			stopAudio(path)
		}
	}

	// const convertToDirectLink = (link) => {
	// 	const fileId = link.match(/[-\w]{25,}/)
	// 	return fileId
	// 		? `https://drive.google.com/uc?export=download&id=${fileId[0]}`
	// 		: link
	// }

	const handleMusicClick = (versenumber, ind, path) => {
		setPlaying(!playing)

		setRepeat(false)
		handleItemClick(ind)

		// let path = `src/media/${ind + 1}.m4a`
		// let path = "https://vsmusic.s3.us-east-2.amazonaws.com/1.m4a"

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
			console.log(" playing...")
			playAudio(path)
		} else {
			console.log("stop playing...")
			setPlaying(false)
			setRepeat(false)
			stopAudio(path)
		}
	}

	const playAudio = (path, repeat = false) => {
		audioRef.current = new Audio(path)

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
			.catch((error) => console.log("Error playing audio:", error))
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

	// const completeData = realData.map((verse, index) => ({
	// 	...verses[index],
	// 	verse: verse.verse,
	// 	play: false, repeat: false,
	// 	path: "asdf\\sadfasfd",
	// 	number: index + 1,
	// }))
	return (
		<>
			<div id="heading">॥ श्रीविष्णुसहस्रनामस्तोत्रम् ॥</div>
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
													<div className="tooltip-content">{word.artha}</div>
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
													<div className="tooltip-content">{word.artha}</div>
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
