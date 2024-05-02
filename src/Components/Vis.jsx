import React, {useRef, useState, useEffect} from "react"
import Move from "./Move"
import {Tooltip} from "react-tooltip"
import {v4 as uuidv4} from "uuid"
import "../index.css"

function Vis() {
	const data = [
		{
			number: 1,
			verse:
				"ॐ विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः ।\n भूतकृद् भूतभृद् भावो भूतात्मा भूत भावनः ।।१।।",
			artha: {
				1: "ॐ: - म्हणजे हे विश्च ज्याच्यातून उत्पन्न होते, \nज्याचे ठिकाणी नादते आणि अतीज्याच्यामध्ये विलिन होते. तो.",
				2: "विश्वं: - सर्व विश्वाचे जो कारण आहे\n वा जो स्वतःच विश्वरूपाने नटटेला आहे, वा जो या सर्व दिसणाच्याभासणाच्या, असणाच्या विश्चामध्ये ओतप्रोत भरून राहिला आहे, वा विश्वाच्या उत्पत्तिला ,स्थितीला आणिप्रलयाला जो एकमात्र कारण आहे.",
				3: "विष्णुः - व्यापणे हा ज्याचा स्वभाव आहे, जो सर्वाना अंतर्बाह्य व्यापून टाकतो व त्यामुक्छेच देश, काल,वस्तुस्वरूप याच्यामुक्ठे जो कधीहि मर्यादित होत नाही तो, वा विश्वामध्ये शिरून राहतो म्हणून विष्णु म्हणता येते.",
				4: "वषट्कार - यज्ञामध्ये वषट् ही क्रिया ज्याला उदेशून केटी जाते तो, किंवा यज्ञामध्ये केली जाणारी वषटूक्रियाहेच ज्याचे स्वरूप आहे, कारण यज्ञ हाच विष्णू आहे(यज्ञो वै विष्णुः) असे तैतरिय उपनिषदात सांगितले आहे.",
				5: "भूतभव्यभवत्प्रभुः - भूत म्हणजे आलेले, भव्य म्हणजे भविष्यकाली अस्तित्वात येणारे आणि भवत् म्हणजेवर्तमानकाली असलेले अशा तिन्ही कालातील वस्तुजातावर ज्याची सत्ता आहे.",
				6: "भूतकृत् - रजोगुणाचा आश्रय घेऊन ब्रह्मकदेवाच्या रूपाने जो भूताची म्हणजे उत्पन्न होणान्या सर्व वस्तूचीरचना करतो किंवा कृत् यामध्ये कृन्त धातु गृहीत धरला तर जो तमोगुणाचा आश्रय करून रुद्ररूपाने सर्व उत्पन्न्ालेल्याचा म्हणजे भूताचा नाश करतो, संहार करतो.",
				8: "भूतभृत् - सत््वगुणांचा आश्रय करून जो सर्व भूतांचे भरण म्हणजेच धारण , पालनपोषण करतो",
				9: "भाव - निर्माण होणे, जन्माला येणे वा अस्तित्व असणे हे दोन्ही भ",
			},
		},
		{
			number: 2,
			verse:
				"afsd asdfa विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः ।\nभूतकृद् भूतभृद् भावो भूतात्मा भूत भावनः ।।१।।",
			artha: {
				1: "asfd - सर्व विश्वाचे जो कारण आहे वा\n जो स्वतःच विश्वरूपाने नटटेला आहे, वा जो या सर्व दिसणाच्याभासणाच्या, असणाच्या विश्चामध्ये ओतप्रोत भरून राहिला आहे, वा विश्वाच्या उत्पत्तिला ,स्थितीला आणिप्रलयाला जो एकमात्र कारण आहे. म्हणजे हे विश्च ज्याच्यातून उत्पन्न होते, ज्याचे ठिकाणी नादते आणि अतीज्याच्यामध्ये विलिन होते. तो.",
				2: "asdfa - व्यापणे हा ज्याचा स्वभाव आहे, जो सर्वाना अंतर्बाह्य व्यापून टाकतो व त्यामुक्छेच देश, काल,वस्तुस्वरूप याच्यामुक्ठे जो कधीहि मर्यादित होत नाही तो, वा विश्वामध्ये शिरून राहतो म्हणून विष्णु म्हणता येते.",
				3: "वषट्कार - यज्ञामध्ये वषट् ही क्रिया ज्याला उदेशून केटी जाते तो, किंवा यज्ञामध्ये केली जाणारी वषटूक्रियाहेच ज्याचे स्वरूप आहे, कारण यज्ञ हाच विष्णू आहे(यज्ञो वै विष्णुः) असे तैतरिय उपनिषदात सांगितले आहे.",
				4: "भूतभव्यभवत्प्रभुः - भूत म्हणजे आलेले, भव्य म्हणजे भविष्यकाली अस्तित्वात येणारे आणि भवत् म्हणजेवर्तमानकाली असलेले अशा तिन्ही कालातील वस्तुजातावर ज्याची सत्ता आहे.",
				5: "भूतकृत् - रजोगुणाचा आश्रय घेऊन ब्रह्मकदेवाच्या रूपाने जो भूताची म्हणजे उत्पन्न होणान्या सर्व वस्तूचीरचना करतो किंवा कृत् यामध्ये कृन्त धातु गृहीत धरला तर जो तमोगुणाचा आश्रय करून रुद्ररूपाने सर्व उत्पन्न्ालेल्याचा म्हणजे भूताचा नाश करतो, संहार करतो.",
				6: "भूतभृत् - सत््वगुणांचा आश्रय करून जो सर्व भूतांचे भरण म्हणजेच धारण , पालनपोषण करतो",
				7: "भाव - निर्माण होणे, जन्माला येणे वा अस्तित्व असणे हे दोन्ही भ",
			},
		},
	]

	const verses = data.map((verseData, index) => {
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

	const completeData = data.map((verse, index) => ({
		...verses[index],
		verse: verse.verse,
	}))

	const [tooltipWidth, setTooltipWidth] = useState("auto")
	const tooltipRef = useRef()

	useEffect(() => {
		// Update tooltip width when component mounts or window resizes
		function updateTooltipWidth() {
			if (tooltipRef.current) {
				setTooltipWidth(tooltipRef.current.offsetWidth + "px")
			}
		}

		updateTooltipWidth() // Initial calculation

		window.addEventListener("resize", updateTooltipWidth)
		return () => window.removeEventListener("resize", updateTooltipWidth)
	}, [])

	return (
		<div>
			{completeData.map((verseData, ind) => (
				<div className="p-5 " key={ind}>
					<br></br>
					{verses[ind].map((word, wordIndex) =>
						word.word.includes("।") ? (
							<>
								<a
									className="multiline-text"
									id={"ind" + word.id}
									key={wordIndex}
								>
									{word.word}
									<br />
								</a>
								<Tooltip
									key={"asdf" + wordIndex}
									anchorSelect={`${"#ind" + word.id}`}
									className={`${"#" + wordIndex}`}
									style={{maxWidth: tooltipWidth}} // Set max width dynamically
								>
									<div className="multiline-text" ref={tooltipRef}>
										{word.artha}
									</div>
								</Tooltip>
							</>
						) : (
							<>
								<a
									className="multiline-text"
									id={"ind" + word.id}
									key={wordIndex}
								>
									{word.word}&nbsp;
								</a>
								<Tooltip
									key={"asdf" + wordIndex}
									anchorSelect={`${"#ind" + word.id}`}
									className={`${"#" + wordIndex}`}
									style={{maxWidth: tooltipWidth}} // Set max width dynamically
								>
									<div className="multiline-text" ref={tooltipRef}>
										{word.artha}
									</div>
								</Tooltip>
							</>
						)
					)}
				</div>
			))}
		</div>
	)
}

export default Vis
