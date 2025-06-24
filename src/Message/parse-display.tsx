import { Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Thead, Tr } from "@chakra-ui/react";
import { exampleMessage } from "../data/example278R";
import { paddedLineNum } from "../helper/helpers";
import { parsedMessage } from "../helper/interfaceDefinitions";
import AccordionSection from "../Layout/AccordionSection";
import Segment from "./Segment";

type propsType = {
    setcurrentInputMessage: React.Dispatch<string>;
    currentInputMessage: string;
    parseMessage: (arg0: string) => parsedMessage;
    fieldDelimiter: string;
    segmentDelimiter: string;
};

export default function ParseDisplay(props: propsType) {
    const { setcurrentInputMessage, currentInputMessage, parseMessage } = props;

    function displayMessage(messageText: string) {
        const parsedMessage: parsedMessage = parseMessage(messageText);
        const messageDate = parsedMessage[0][0][9];
        const messageTime = parsedMessage[0][0][10];
        const messageNumber = parsedMessage[0][0][13];
        let lineCount = 0
        const headerFooter = <Tr><Td>Line</Td><Td>Segment</Td></Tr>
        // A Box for each loop
        return <TableContainer>
            <Table variant={'unstyled'}>
                <TableCaption>
                    <Text>Date: {messageDate}</Text>
                    <Text>Time: {messageTime}</Text>
                    <Text>Message #: {messageNumber}</Text>
                </TableCaption>
                <Thead>{headerFooter}</Thead>
                <Tbody>
                    {parsedMessage.map((loop, loopNumber) => {
                        let loopIndent = loopNumber;
                        if (loopIndent > 5) { loopIndent = 0; }
                        return (<>
                            {loop.map((segmentContents) => {
                                const lineNumber = ++lineCount;
                                return (<Segment key={paddedLineNum(lineNumber) + '-' + loopNumber + '-' + segmentContents[0]} loop={loopNumber} segmentContents={segmentContents} lineNumber={lineNumber} segmentDelimiter={props.segmentDelimiter} fieldDelimiter={props.fieldDelimiter} />);
                            })}
                        </>);
                    })};
                </Tbody>
                <Tfoot>{headerFooter}</Tfoot>
            </Table>
        </TableContainer>
    }

    return <>
        <AccordionSection title="Enter Message">
            <Textarea id="messageInput" h={'2xl'} w={'2xl'}
                defaultValue={exampleMessage}
                onChange={(e) => {
                    setcurrentInputMessage(e.target.value);
                    console.log(currentInputMessage)
                }}
            ></Textarea>
        </AccordionSection>
        <AccordionSection title="Parsed Message">
            <Box id="messageDisplay" >{displayMessage(currentInputMessage)}</Box>
        </AccordionSection>
    </ >;
}