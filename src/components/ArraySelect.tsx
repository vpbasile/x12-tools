export default function ArraySelect(props: { choicesArray: string[], onChange: any }) {
	const choicesArray = props.choicesArray;
	const onChange = props.onChange
	const options = choicesArray.map(
		(thisValue) => {
			return (<option key={thisValue} value={thisValue}>{thisValue}</option>)
		}
	)
	return (
		<select className="form-select" onChange={e=>onChange(e.target.value)}>
			{options}
		</select>
	)

}