import { Tooltip, Text } from "@chakra-ui/react";

export default function Field(props: { fieldNumber: number, contents: string, tooltip: string, fieldDelimiter: string, colorScheme: string, fieldKey: string, lineNumber: number }): JSX.Element {
	const fieldDelimiter = props.fieldDelimiter;
	const fieldNumber = props.fieldNumber;
	let contents = props.contents;
	let tooltip = props.tooltip;
	const lineNumber = props.lineNumber;
	const fieldKey = props.fieldKey

	if (fieldNumber !== 0) { contents = (fieldDelimiter) + contents }
	else { tooltip = "Line " + lineNumber + ": " + contents + " segment" }

	// Render
	return (<Tooltip _light={{ bg: 'purple.100' }} _dark={{ bg: 'purple.900' }} display={'inline-block'} key={lineNumber + '-' + fieldKey + '-' + tooltip} id={tooltip} label={tooltip} aria-label={tooltip} color={props.colorScheme} >
		<Text color={props.colorScheme}>{contents}</Text>
		
	</Tooltip >)
}