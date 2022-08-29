import Field from '../components/Field';
import { paddedFieldNum } from '../helper/helpers';

export default function Segment(props: {
	loop: number,
	segmentContents: string[],
	lineNumber: number,
	segmentDelimiter: string,
	fieldDelimiter: string
}) {
	const loopNumber = props.loop;
	const fieldDelimiter = props.fieldDelimiter;
	const linenumber = props.lineNumber;
	const segmentContents = props.segmentContents
	const segmentID = segmentContents[0];
	const segmentDelimiter = props.segmentDelimiter

	let segmentClasses: string = `segment p-1 ` // ms-${loopNumber}
	// Figure out how to style the segment
	if ((segmentID === 'ISA') || (segmentID === 'IEA')) { segmentClasses += "bg-dark bg-opacity-10" }
	// <> HL segments should be more visible.
	if (segmentID === "HL") { segmentClasses += "bg-info bg-opacity-25" }

	return (<h5 className={segmentClasses} key={`line-${linenumber}`}>
		{segmentContents.map((fieldContents, fieldNumber) => {
			let toolTip = segmentID + paddedFieldNum(fieldNumber)
			const fieldKey = `${loopNumber}-${segmentID}-${fieldNumber}`
			return <Field key={fieldKey} fieldNumber={fieldNumber} contents={fieldContents} tooltip={toolTip} fieldDelimiter={fieldDelimiter} />
		})}
		{segmentDelimiter}
	</h5>)
}