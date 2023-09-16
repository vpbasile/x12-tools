import { snapshot } from "../helper/interfaceDefinitions"
import { nanoid } from "nanoid";

import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	Box,
	Button,
} from '@chakra-ui/react'


export default function SnapshotTable(props: {
	snapshots: snapshot[], deleteSnapshot: any
}) {
	const snapshots = props.snapshots;
	const deleteSnapshot = props.deleteSnapshot;
	const headerFooter = <Tr>
		<Th>Msg #</Th>
		<Th>Loop</Th>
		<Th>Field</Th>
		<Th>Value</Th>
		<Th>Timestamp</Th>
		<Th><Button className="form-control" isDisabled={true}>X</Button></Th>
	</Tr>;
	return (
		<Box id="compareDiv">
				<Table className="table">
					<Thead>{headerFooter}</Thead>
					<Tbody>
						{snapshots.map((row) => {
							if (row.messageNumber === 0) { return null; }
							return (<Tr key={`snapshot-${nanoid()}`}>
								<Td>{row.messageNumber}</Td>
								<Td>{row.snappedLoop}</Td>
								<Td>{row.snappedField}</Td>
								<Td>{row.value}</Td>
								<Td>{row.timestamp}</Td>
								<Td><Button className="form-control" onClick={() => deleteSnapshot(row.deleteKey)}>X</Button></Td>
							</Tr>)
						})}
					</Tbody>
					<Tfoot>{headerFooter}</Tfoot>
				</Table>
		</Box>
	)
}