import { Box, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Dispatch } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ArraySelect from "../helper/ArraySelect";
import { segmentIDs } from "../data/segmentInfo";
import { snapshot } from "../helper/interfaceDefinitions";
import AccordionSection from "../Layout/AccordionSection";
import SnapshotTable from "./SnapshotTable";

export default function CompareDisplay(props: { takeSnapShot: () => void; snapShots: snapshot[]; deleteSnapshot: (id: string) => void; setWatchField: Dispatch<React.SetStateAction<number>>; setWatchSegment: Dispatch<React.SetStateAction<string>>; }) {

    const { takeSnapShot, snapShots, deleteSnapshot, setWatchField, setWatchSegment } = props;
    const headerFooter = <Tr><Th>Segment</Th><Th>Field</Th><Th></Th></Tr>;
    const myTable = <TableContainer>
        <Table>
            <Thead>{headerFooter}</Thead>
            <Tbody>
                <Tr>
                    <Td><ArraySelect choicesArray={segmentIDs} onChange={setWatchSegment} /></Td>
                    <Td><Input type="number" onChange={e => setWatchField(+e.target.value)} /></Td>
                    <Td><Input type="button" value="Snapshot" onClick={takeSnapShot} /></Td>
                </Tr>
            </Tbody>
            {/* <Tfoot>{headerFooter}</Tfoot> */}
        </Table>
    </TableContainer>;

    return <AccordionSection title={'Compare Snapshots'}>
        <ErrorBoundary fallback={<Box p={4}>Error: Something went wrong</Box>}>
            {myTable}
            {<Box id="snapshotBox" p={4}><Text fontSize='lg'>Snapshots</Text><SnapshotTable snapshots={snapShots} deleteSnapshot={deleteSnapshot} /></Box>}
        </ErrorBoundary>

    </AccordionSection>
}