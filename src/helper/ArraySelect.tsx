import { Heading, Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export default function ArraySelect(props: { choicesArray: string[], onChange: Dispatch<SetStateAction<string>>, labelText?: string }) {
	const choicesArray = props.choicesArray;
	const onChange = props.onChange
	const labelText = props.labelText;

	const options = choicesArray.map(
		(thisValue) => {
			return (<option key={thisValue} id={thisValue} value={thisValue}>{thisValue}</option>)
		}
	)
	return (
		<>
			{labelText && <Heading>{labelText}</Heading>}
			<Select colorScheme="green" onChange={e => onChange(e.target.value)}>
				{options}
			</Select>
		</>
	)

}