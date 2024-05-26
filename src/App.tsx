import { useState } from 'react';

// <> Import data from local files
import { exampleMessage } from './data/example271';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, List, ListIcon, ListItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { segmentInfo } from './data/segmentInfo';
import { paddedFieldNum } from './helper/helpers';
import { parsedMessage, snapshot } from './helper/interfaceDefinitions';
import AccordionSection from './Layout/AccordionSection';
import Layout from './Layout/Layout';
import ParseDisplay from './Message/parse-display';
import CompareDisplay from './Snapshot/compare-display';
import TodoList from './TodoList';

// <> Parsing Constants
const segmentDelimiter = `~`;
const fieldDelimitier = '*';

export default function App() {

  // <> Define constants
  // const modes = [
  //   "Compare",
  //   "Just parse",
  //   // "AuthCert Stuff"
  // ]

  // <> Define app states
  // const { isOpen, onClose } = useDisclosure() // Disclosure for safety warnings
  // const [mode] = useState(modes[0])
  const [currentInputMessage, setcurrentInputMessage] = useState(exampleMessage)

  // <> Define the snapshot state
  const emptysnapShots: snapshot[] = [{ messageNumber: 0, snappedLoop: 0, snappedLine: 0, snappedField: "", value: "", timestamp: "", deleteKey: "" }]
  const [snapShots, setSnapshots] = useState(emptysnapShots)
  const [watchSegment, setwatchSegment] = useState(segmentInfo[0].id)
  const [watchField, setwatchField] = useState(0)

  // <> Define the snapshot functions
  function takeSnapShot() {

    const whatField = `${watchSegment} - ${paddedFieldNum(watchField)}`;
    let foundAnyting: boolean = false;
    console.log(`Taking snapshot of ${whatField} in all loops.`)
    const parsedMessage = (parseMessage(currentInputMessage));
    const tempSnapshots = Array.from(snapShots);
    const messageDate = parsedMessage[0][0][9];
    const messageTime = parsedMessage[0][0][10];
    const messageNumber = parsedMessage[0][0][13];

    let lineCounter = 0;

    parsedMessage.forEach((loop, loopNumber) => {
      lineCounter++;
      const foundSegments = loop.filter((segment: string[]) => {
        return segment[0] === watchSegment
      });
      if (foundSegments.length === 0) { return [] }
      let foundFields: string[] = [];
      if (foundSegments.length > 0) {
        foundFields = foundSegments.map((segment: string[]) => { return (segment[watchField]) })
        // This still returns something if the field isn't there
      }
      foundFields.forEach((value) => {
        const newRow: snapshot = { messageNumber: +messageNumber, snappedLoop: loopNumber, snappedLine: lineCounter, snappedField: whatField, value: value, timestamp: `${messageDate} ${messageTime}`, deleteKey: nanoid() }
        tempSnapshots.unshift(newRow)
      })
      if (foundSegments.length > 0) { foundAnyting = true; }
    });
    if (!foundAnyting) { alert(`No ${whatField} values found in the message`); }
    // FIXME Sort the snapshots by line/segment number
    setSnapshots(tempSnapshots)
  }

  function deleteSnapshot(id: string) {
    let tempSnapshots = Array.from(snapShots);
    tempSnapshots = tempSnapshots.filter((snapshot) => snapshot.deleteKey !== id)
    setSnapshots(tempSnapshots);
  }

  // <> Parsing funcitons
  // Message
  // Loops
  // Segments
  // Fields
  // Subfields

  function parseMessage(messageText: string): parsedMessage {
    // console.log('Parsing message',messageText)
    // console.log('segmentDelimiter',segmentDelimiter)
    let loopNumber = 0;
    const parsedMessage: parsedMessage = []
    parsedMessage[0] = []
    // Divide the message into segments
    const messageSegments = messageText.split(segmentDelimiter)
    // console.log('messageSegments',messageSegments)
    // We have to remove the extra tilde at the end
    messageSegments.pop();
    messageSegments.forEach((segment) => {
      // Split the segment into fields
      const splitSegment = segment.split(fieldDelimitier)
      // console.log('splitSegment', splitSegment)
      // If it's an HL segment, then we've found another loop
      if ((splitSegment[0] === "HL") || (splitSegment[0] === "IEA")) {
        // Create an array to store the segments in this loop
        loopNumber++; parsedMessage[loopNumber] = [];
      }
      parsedMessage[loopNumber].push(splitSegment)
    })
    return parsedMessage;
  }

  // ---------------------------------------------
  // <> Make a component
  // ---------------------------------------------

  // <> Render the app
  return (
    <Layout>
      {/* Everything in here needs to be an AccordionSection */}
        <ParseDisplay parseMessage={parseMessage}
          setcurrentInputMessage={setcurrentInputMessage} currentInputMessage={currentInputMessage}
          fieldDelimiter={fieldDelimitier} segmentDelimiter={segmentDelimiter}
        />
        <CompareDisplay snapShots={snapShots} takeSnapShot={takeSnapShot} deleteSnapshot={deleteSnapshot} setWatchSegment={setwatchSegment} setWatchField={setwatchField} />
        <AccordionSection title="Links">
          <List>
            <ListItem><Link href='https://x12.org/examples/005010x217/example-1a-referral-request-review'><ListIcon as={ExternalLinkIcon} color={'green.500'} />Example messages from X12.org</Link></ListItem>
            <ListItem><Link href="https://www.cms.gov/files/document/esmd-x12n-278-companion-guide.pdf"><ListIcon as={ExternalLinkIcon} color={'green.500'} />Example messages from CMS</Link></ListItem>
          </List>
        </AccordionSection>
        <TodoList />
    </Layout>);
}