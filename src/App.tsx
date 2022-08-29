import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ArraySelect from './components/ArraySelect';
import './css/bootstrap.css'

// <> Import data from local files
// import segmentIDs from './segmentIdentifiers.json'
import segmentInfo from './data/segmentInfo.json'

// <> Import the Display Components
import Segment from './components/Segment';
import SnapshotTable from './components/SnapshotTable';
import ErrorBoundary from './components/ErrorBoundary';

import { parsedMessage, snapshot } from './helper/interfaceDefinitions';
import { paddedFieldNum } from './helper/helpers';

// <> Parsing Constants
const segmentDelimiter = `~`;
const fieldDelimitier = '*';

export default function App() {
  // <> Define constants
  const modes = [
    "Trace/Compare",
    // "AuthCert Stuff"
    "Just parse"
  ]
  const segmentIDs = segmentInfo.map((eachsegment) => { return eachsegment.id })

  // <> Define app states
  const [mode, setMode] = useState(modes[0])
  const [watchSegment, setwatchSegment] = useState(segmentInfo[0].id)
  const [watchField, setwatchField] = useState(0)
  const [currentInputMessage, setcurrentInputMessage] = useState("You haven't entered a message.")
  // const [currentParsedMessage, setcurrentParsedMessage] = useState(dummyMessage)
  let emptysnapShots: snapshot[] = [{ messageNumber: 0, snappedLoop: 0, snappedField: "", value: "", timestamp: "", deleteKey: "" }]
  const [snapShots, setSnapshots] = useState(emptysnapShots)

  // <> Prep/cache some things for render
  const compareMode = (mode === "Trace/Compare")
  // const authcertmode = (mode === "AuthCert Stuff")

  // <> Parsing funcitons
  // Message
  // Loops
  // Segments
  // Fields
  // Subfields

  function parseMessage(messageText: string): parsedMessage {
    let loopNumber = 0;
    let parsedMessage: parsedMessage = []
    parsedMessage[0] = []
    // Divide hthe message into segments
    let splitMessage = messageText.split(segmentDelimiter)
    // We have to remove the extra tilde at the end
    splitMessage.pop();
    splitMessage.forEach((segment) => {
      // Split the segment into fields
      let splitSegment = segment.split(fieldDelimitier)
      // If it's an HL segment, then we've found another loop
      if ((splitSegment[0] === "HL") || (splitSegment[0] === "IEA")) {
        // Create an array to store the segments in this loop
        loopNumber++; parsedMessage[loopNumber] = [];
      }
      parsedMessage[loopNumber].push(splitSegment)
    })
    return parsedMessage;
  }

  function displayMessage(messageText: string) {
    let parsedMessage: parsedMessage = parseMessage(messageText);
    let returnMessage;
    let lineCount = 0
    // A div for each loop
    returnMessage = parsedMessage.map((loop, loopNumber) => {
      let loopIndent = loopNumber
      if (loopIndent > 5) { loopIndent = 0; }
      return (<div className={`loop ms-${loopIndent} border-start border-dark border-5`} key={`loop-${loopNumber}`}>
        {loop.map((segmentContents) => {
          let segmentKey = `${loopNumber}-${segmentContents[0]}`
          return (<Segment key={segmentKey} loop={loopNumber} segmentContents={segmentContents} lineNumber={++lineCount} segmentDelimiter={segmentDelimiter} fieldDelimiter={fieldDelimitier} />)
        })}
      </div>)
    })
    return returnMessage;
  }

  // <> Helper funcitons

  function takeSnapShot() {
    const whatField = `${watchSegment} - ${paddedFieldNum(watchField)}`;
    let foundAnyting: Boolean = false;
    console.log(`Taking snapshot of ${whatField} in all loops.`)
    let parsedMessage = (parseMessage(currentInputMessage));
    let tempSnapshots = Array.from(snapShots);
    const messageDate = parsedMessage[0][0][9];
    const messageTime = parsedMessage[0][0][10];
    const messageNumber = parsedMessage[0][0][13];

    parsedMessage.forEach((loop, loopNumber) => {
      let foundSegments = loop.filter((segment: string[]) => {
        return segment[0] === watchSegment
      });
      if (foundSegments.length === 0) { return [] }
      let foundFields: any[] = [];
      if (foundSegments.length > 0) {
        foundFields = foundSegments.map((segment: string[]) => { return (segment[watchField]) })
        // This still returns something if the field isn't there
      }
      foundFields.forEach((value) => {
        let newRow: snapshot = { messageNumber: +messageNumber, snappedLoop: loopNumber, snappedField: whatField, value: value, timestamp: `${messageDate} ${messageTime}`, deleteKey: nanoid() }
        tempSnapshots.unshift(newRow)
      })
      if (foundSegments.length > 0) { foundAnyting = true; }
      // if (foundSegments.length === 0) { alert(`No ${whatField} values found in the message`); return [] }
    });
    if (!foundAnyting) { alert(`No ${whatField} values found in the message`); }
    setSnapshots(tempSnapshots)
  }

  function deleteSnapshot(id: any) {
    let tempSnapshots = Array.from(snapShots);
    tempSnapshots = tempSnapshots.filter((snapshot) => snapshot.deleteKey !== id)
    setSnapshots(tempSnapshots);
  }

  // <> Render the app
  return (<div className="App container bg-light">
    <div className="row">
      <header className="App-header col">
        <h1>X12 Tools</h1>
      </header>
    </div>
    <div id='appContentRow' className='row'>
      <div id="inputDiv" className="col-9 p-3">
        <h2>Paste a message and press enter</h2>
        <textarea id="textInput" className="form-control"
          onChange={(e) => {
            setcurrentInputMessage(e.target.value);
          }}
        ></textarea>
        {compareMode && <table className='table'>
          <thead>
            <tr><th>Segment</th><th>Field</th><th></th></tr>
          </thead>
          <tbody>
            <tr>
              <td><ArraySelect choicesArray={segmentIDs} onChange={setwatchSegment} /></td>
              <td><input type="number" className='form-control' onChange={e => setwatchField(+e.target.value)} /></td>
              <td><input type="button" value="Snapshot" className='form-control' onClick={takeSnapShot} /></td>
            </tr>
          </tbody>

        </table>}
      </div>
      <div id="modeDiv" className='col-3 p-3'>
        <label>Mode:</label>
        <ArraySelect choicesArray={modes} onChange={setMode} />
      </div>
      <hr />
      <div id="outputDiv" className='row'>
        <ErrorBoundary>
          {compareMode && <div id="snapshotDiv" className="col-12"><SnapshotTable snapshots={snapShots} deleteSnapshot={deleteSnapshot} /></div>}
        </ErrorBoundary>
        <div id="messageDisplay" className="col-12">{displayMessage(currentInputMessage)}</div>
      </div>
    </div>
    <div id='safetyNote' className=''>
      <p>While this app is published to the web, the data is all parsed and handled locally on the user's machine. No data is saved or transferred anywhere.  <span className='fw-bold'>
          Please remember to handle all PII and PHI safely to protect the patients and other parties referenced in message data.
        </span>
      </p>
    </div>
  </div>);
}