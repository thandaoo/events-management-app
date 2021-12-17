import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle, CPagination, CPaginationItem, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CToast, CToastBody, CToastHeader } from '@coreui/react';

import { DateTime }from 'luxon';
import DateTimePicker from 'react-datetime-picker';
import React from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

// import {eventActions, eventState} from '../../store/event/';

const baseURL = 'https://mobile-app-interview.awair.is/events';

export default function Home() {
const [eventsList, setEventsList] = React.useState(null);
const [apiError, setApiError] = React.useState(null);
const [showModal, setShowModal] = React.useState(null);
const [titleValue,titleValueOnChange] = React.useState(null);
const [startValue, startOnChange] = React.useState(DateTime.local());
const [endValue, endOnChange] = React.useState(DateTime.local());
const [submit, setSubmit] = React.useState(null);


React.useEffect(() => {
    if(submit === null || submit ===false) {
        axios.get(baseURL).then((response)=> {
        setEventsList(response.data.events);
        }).catch(error => {
        console.log('error: ', error.message);
        setApiError(error);
     });
    } 
},[]);

React.useEffect(() => {
    if(submit) {
        let i ={title: titleValue, start: DateTime.fromISO(startValue, "LLLL ").toFormat('LLLL d, yyyy t'), end: DateTime.fromISO(endValue).toFormat('LLLL d, yyyy t')}
        const newList = eventsList.slice();
        newList.push(i);
    setEventsList(newList);
}
  titleValueOnChange(null);
}, [submit]);

React.useEffect(() => {
   if(titleValue !=="" && titleValue !== null) {
       
        titleValueOnChange(titleValue);
    }
}, [titleValue])

if (!eventsList) return null;

 return( <CRow className='p-2'>
        { !!apiError &&   (
        <CToast visible={!!apiError}>
            <CToastHeader><strong className="text-danger">Error Occurred!</strong></CToastHeader>
            <CToastBody style={{fontWeight: 600}}>{apiError.toString()}</CToastBody>
        </CToast>
        )}
           <div className="text-center"><h1>Events Management App</h1></div> 
             <CCard className="mt-4 px-2">
                <CCardHeader className="py-3" style={{fontSize: '20px', fontWeight: 550}}>
                <CRow className="justify-space-between px-2">
                <CCol>List of Events</CCol>
                <CCol style={{textAlign: 'right'}}><CButton color="warning" onClick={() => {
                    setShowModal(true);
                    setSubmit(false);
                }} >Add New Event</CButton></CCol>
                </CRow>
                </CCardHeader>
                <CCardBody>
                    <CModal alignment="center" backdrop="static" size="lg" visible={showModal} onClose={() => setShowModal(false)}>
                        <CModalHeader>
                            <CModalTitle  className="px-3">Add New Event</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CForm className="px-3" >
                                <div className="py-3">
                                    <CFormLabel htmlFor="title">Title</CFormLabel>
                                    <CFormInput type="text" id="title" name="title" onChange={(e) => titleValueOnChange(e.target.value)} value={titleValue}></CFormInput>
                                </div>
                                 <CRow className="pt-2 pb-4">
                                     <CCol>
                                    <CFormLabel htmlFor="start">Start Date</CFormLabel>
                                    <div><DateTimePicker onChange={startOnChange} value={startValue}/></div>
                                    </CCol>
                                    <CCol>
                                    <CFormLabel htmlFor="end">End Date</CFormLabel>
                                    <div><DateTimePicker onChange={endOnChange} value={endValue}/></div>
                                    </CCol>
                                </CRow>
                                <hr />
                                <div style={{ textAlign:'end', marginTop: '1.2em', marginBottom: '1em'}}> 
                                <CButton type="button" color="primary" size="lg" onClick={() => {
                                    setSubmit(true);
                                    setShowModal(false);
                                }}>Submit</CButton>
                                </div>
                            </CForm>
                        </CModalBody>
                    </CModal>
                    {console.log('apiError: ', apiError)}
                    {!!eventsList ? (
                        <CTable>
                            <CTableHead>
                                <CTableRow color="dark">
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                </CTableRow>    
                            </CTableHead>
                            <CTableBody>
                                {apiError === null && eventsList.map((data, index) => {
                                    return (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope='row'>{index+1}</CTableHeaderCell>
                                            <CTableDataCell>{!isEmpty(data.title) ? data.title : '-'}</CTableDataCell>
                                            <CTableDataCell>{data.start}</CTableDataCell>
                                            <CTableDataCell>{data.end}</CTableDataCell>
                                            <CTableDataCell><CButton className="mt-2" color="danger" size="sm" variant="outline" 
                                            onClick={()=>{
                                                console.log('data: ', data, index );
                                                let newEventsList = eventsList.filter(item=> item.title !== data.title);
                                                console.log('newEventsList: ', newEventsList);
                                                setEventsList(newEventsList)}}>Delete</CButton></CTableDataCell>
                                        </CTableRow>
                                    )
                                })}
                            </CTableBody>
                        </CTable> 
                    ) : <div>...</div>}
                     <CPagination aria-label="events table footer" align="end">
                        <CPaginationItem disabled={true}>Prev</CPaginationItem>
                        <CPaginationItem active={true}>1</CPaginationItem>
                        <CPaginationItem>2</CPaginationItem>
                        <CPaginationItem>Next</CPaginationItem>
                    </CPagination>
                </CCardBody>
            </CCard>
        </CRow>)
       }
