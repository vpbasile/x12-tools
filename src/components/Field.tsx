export default function Field(props:{fieldNumber:number, contents:string, tooltip: string, fieldDelimiter: string}): JSX.Element{
	const fieldDelimiter = props.fieldDelimiter;
	const fieldNumber = props.fieldNumber;
	let contents = props.contents;
	let tooltip = props.tooltip;
	if (fieldNumber !== 0) {contents = (fieldDelimiter) + contents}
	else { tooltip = contents + " segment"}

	// Render
	return (<span className="field" title={tooltip}>{contents}</span>)
}