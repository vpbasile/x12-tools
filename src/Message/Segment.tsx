import { Box, Td, Tr } from '@chakra-ui/react';
import { paddedFieldNum } from '../helper/helpers';
import Field from './Field';

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

	let segmentColor: string = ``
	// Figure out how to style the segment
	if ((segmentID === 'ISA') || (segmentID === 'IEA')) { segmentColor = "green.500" }
	// <> HL segments should be more visible.
	if (segmentID === "HL") { segmentColor = 'red.500' }

	let z = 0;
	return (<Tr key={`line-${linenumber}`} id={`line-${linenumber}`} w={'96'}>
		<Td>{linenumber}</Td>
		<Td>{segmentContents.map((fieldContents, fieldNumber) => {
			const toolTip = segmentID + paddedFieldNum(fieldNumber)
			const fieldKey = `${loopNumber}-${segmentID}-${fieldNumber}`
			const nextKey = z++;
			return <Box key={nextKey} id={`${nextKey}`} display={'inline-block'}>< Field lineNumber={linenumber} fieldKey={fieldKey} fieldNumber={fieldNumber} contents={fieldContents} tooltip={toolTip} fieldDelimiter={fieldDelimiter} colorScheme={segmentColor} /></Box>
		})}</Td>
		<Td>{segmentDelimiter}</Td>
	</Tr>)
}