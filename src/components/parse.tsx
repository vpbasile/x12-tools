import { Box, Textarea, Heading, Stack, Text } from "@chakra-ui/react";
import { exampleMessage } from "../data/example278R";
import { parsedMessage } from "../helper/interfaceDefinitions";
import Segment from "./Segment";
import Collapse from "./collapse";

type propsType = {
    setcurrentInputMessage: React.Dispatch<string>;
    currentInputMessage: string;
    parseMessage: (arg0: string) => parsedMessage;
    fieldDelimiter: string;
    segmentDelimiter: string;
};

export default function ParseDisplay(props: propsType) {
    const currentInputMessage = props.currentInputMessage;
    const setcurrentInputMessage = props.setcurrentInputMessage;
    const parseMessage = props.parseMessage;


    function displayMessage(messageText: string) {
        const parsedMessage: parsedMessage = parseMessage(messageText);
        const messageDate = parsedMessage[0][0][9];
        const messageTime = parsedMessage[0][0][10];
        const messageNumber = parsedMessage[0][0][13];
        let lineCount = 0
        // A Box for each loop
        const returnMessage = parsedMessage.map((loop, loopNumber) => {
            let loopIndent = loopNumber
            if (loopIndent > 5) { loopIndent = 0; }
            return (<Box key={`loop-${loopNumber}`} id={`loop-${loopNumber}`}>
                {loop.map((segmentContents) => {
                    const lineNumber = ++lineCount;
                    const segmentKey = `${lineNumber}-${loopNumber}-${segmentContents[0]}`
                    return (<Segment key={segmentKey} loop={loopNumber} segmentContents={segmentContents} lineNumber={lineNumber} segmentDelimiter={props.segmentDelimiter} fieldDelimiter={props.fieldDelimiter} />)
                })}
            </Box>)
        })
        return <Box>
            <Text>Date: {messageDate}</Text>
            <Text>Time: {messageTime}</Text>
            <Text>Message #: {messageNumber}</Text>
            {returnMessage};
        </Box>
    }

    return <Box id="parsing" p={2} m={2} verticalAlign={'top'}>
        <Collapse buttonText="Enter message.  Click to hide/show.">
            <Stack p={2} m={2}>
                <Textarea id="messageInput" h={'2xl'} w={'2xl'}
                    defaultValue={exampleMessage}
                    onChange={(e) => {
                        setcurrentInputMessage(e.target.value);
                        console.log(currentInputMessage)
                    }}
                ></Textarea>
            </Stack>
        </Collapse>
        <Stack p={2} m={2}>
            <Heading as={'h2'}>Result</Heading>
            <Box id="messageDisplay" >{displayMessage(currentInputMessage)}</Box>
        </Stack>
    </Box>;
}