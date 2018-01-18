import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const columns = [
  {
    Header: "Event type",
    accessor: "t",
    width: 100
  },
  {
    Header: "Summary",
    id: "summary",
    Cell: (props) => {
      switch(props.original.t) {
        case 'timing': 
          return <SummaryTiming event={props.original} />
        case 'event': 
          return <SummaryEvent event={props.original} />
        case 'pageview': 
          return <SummaryPageview event={props.original} />
        default: 
          return '';
      }
    },
    filterMethod: (filter, row) => {
      switch(row._original.t) {
        case 'timing': {
          const {utl, utt} = row._original;
          return utl.startsWith(filter.value) || utt.startsWith(filter.value)
        }
        case 'event': {
          const {ec, ea} = row._original;
          return ec.startsWith(filter.value) || ea.startsWith(filter.value)
        }
        case 'pageview': {
          const {dt, dp} = row._original;
          return dt.startsWith(filter.value) || dp.startsWith(filter.value)
        }
        default: 
          return false;
      }
    }
  }
];


const SummaryTiming = ({event: {utv, utl, utt}}) => {
  return <span>
    <small>var:</small> {utv} &nbsp; &nbsp;
    <small>category:</small> {utl} &nbsp; &nbsp;
    <small>duration:</small> {utt}ms &nbsp; &nbsp;
  </span>;
};

const SummaryEvent = ({event: {ea, ec}})  => {
  return <span>
    <small>category:</small> {ec} &nbsp; &nbsp;
    <small>action:</small> {ea} &nbsp; &nbsp;
  </span>;
};

const SummaryPageview = ({event: {dt, dp}})  => {
  return <span>
    <small>title:</small> {dt} &nbsp; &nbsp;
    <small>page:</small> {dp} &nbsp; &nbsp;
  </span>;
};

export default (props) => {
  return (
    <div>
      <ReactTable
        data={props.events}
        columns={columns}
        className="-striped -highlight"
        showPagination={false}
        filterable={true}
        SubComponent={row => {
          const {_request, ...attrs} = row.original;
          return (
            <div style={{ padding: "20px" }}>
            <table>
              <tbody>
              <tr key={`${row.index}-table`}><th>Attribute</th><th>Value</th></tr>
              {Object.keys(attrs).map(key => (
                <tr key={`${row.index}-${key}`}>
                  <td><strong>{key}</strong></td>
                  <td><code>{attrs[key]}</code></td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
          );
        }}
      />
    </div>
  );
};