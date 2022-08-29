import { snapshot } from "../helper/interfaceDefinitions"
import { nanoid } from "nanoid";

export default function SnapshotTable(props:{ snapshots:snapshot[], deleteSnapshot: any
}){
	const snapshots = props.snapshots;
	const deleteSnapshot = props.deleteSnapshot;
	return (
		<div id="compareDiv" className='col p-3'>
        <table className="table">
          <thead><tr>
			<th>Msg #</th>
			<th>Loop</th>
            <th>Field</th>
			<th>Value</th>
			<th>Timestamp</th>
			<th><button className="form-control" disabled={true}>X</button></th>
          </tr></thead>
          <tbody>
			{snapshots.map((row)=>{
				if (row.messageNumber === 0) { return null; }
				return (<tr key={`snapshot-${nanoid()}`}>
					<td>{row.messageNumber}</td>
					<td>{row.snappedLoop}</td>
					<td>{row.snappedField}</td>
					<td>{row.value}</td>
					<td>{row.timestamp}</td>
					<td><button className="form-control" onClick={()=>deleteSnapshot(row.deleteKey)}>X</button></td>
				</tr>)
			})}
          </tbody>
        </table>
      </div>
	)
}