import React, { useState, useEffect, useReducer }  from 'react';
import { Table } from './Components/Elements/Table';
import { FormControl } from './Components/Form/FormControl';
import { Label } from './Components/Form/Label';
import { TextField } from './Components/Form/Textfield';
import { Container } from './Components/Layout/Container';
import { Button } from './Components/Elements/Button';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Store, { RootStore } from './Stores/RooStore';
import { GetInfo, CreateInfo, UpdateInfo, RemoveInfo } from './Actions/CrudRootAction';
import 'font-awesome/css/font-awesome.min.css';
import filter  from 'lodash/filter';
import { SETARRAYVALUE, SETID} from './Actions/CrudRootActonTypes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Components/Component/Modal';

export default () => {
  // Use Dispatch Hook
  const dispatch = useDispatch();
 // Use useState Hook
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState(0);
  const [edited, setEdited] = useState(0);
  const [filteredByLastName, setFilteredByLastName] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [modaClassName, setModalName] = useState('');
  
  // Re-load info
  const ReLoadData = () => {
    dispatch( GetInfo( `${firstName} ${lastName}` ) );
  }
  // Use UseSlector Hook
  const CRUDSTATE =  useSelector( (state: RootStore) => state.payload);
  const firstNameState =  useSelector( (state: RootStore) => state.payload.first_name);
  const lastNameState =  useSelector( (state: RootStore) => state.payload.last_name);
  const idState =  useSelector( (state: RootStore) => state.payload.id);
  const selectedIdState =  useSelector( (state: RootStore) => state.payload.selectedId );
  
  // Get Info 
  useEffect(() => {
    dispatch( GetInfo( ) );
  }, []);

  // Events
    /* Text Field Event */
  const onChangeEventFirstName = ( event:React.ChangeEvent<HTMLInputElement> ) => setFirstName(event.target.value);
  const onChangeEventLastName = ( event: React.ChangeEvent<HTMLInputElement> ) => setLastName(event.target.value); 
    /* Button Event */
  const submitEvent = async () => {

    if ( edited ) {
      if ( firstName && lastName ) {
        await dispatch( UpdateInfo( {
          first_name: firstName,
          last_name: lastName
        }, id ) );
        
        const  { message } = Store.getState().payload;
       
        toast.success( message );
        setFirstName('');
        setLastName('');
        setId(0);
        // Set Edited state to true
        setEdited(0);
  
        ReLoadData();
      } else {
        toast.error( 'First Name and Last Name must not be empty!');
      }
    
    } else {
      
      if ( firstName && lastName ) {
          await dispatch( CreateInfo( {
            first_name: firstName,
            last_name: lastName
          } ) );
    
          const  { message } = Store.getState().payload;
    
          toast.success( message );
          setFirstName('');
          setLastName('');
          setId(0);
          // Set Edited state to true
          setEdited(0);
          
          ReLoadData();
      } else {
        toast.error( 'First Name and Last Name must not be empty!');
      }
    }
  
  };

  const resetEvent = async() => {
    // Empty those fields
    setFirstName('');
    setLastName('');
    setId(0);
    setSearchKey('');
    // Set filtered uncheck
    setFilteredByLastName(0);
    // Set Edited state to true
    setEdited(0);
    // Reload Data
    ReLoadData();
  } 

  const onConfirmYes = async( proceed?: boolean ) => {

     if ( id > 0 && proceed) {
       await  dispatch( RemoveInfo( id ) );
    
       const  { message } = Store.getState().payload;

       toast.success( message );
       
       ReLoadData();

       setModalName('');
     }
  }

  const onConfirmNo = () => {
    setModalName('');
  }

  /* Table Action Column Event */
  const editActionColumnEvent = async ( event: any ) => { 
    // Get Row index
    const rowIndex: number =  await ( event.target.parentElement.parentNode.parentElement.rowIndex) - 1;
   
    const rowIndexData = filter(CRUDSTATE.payload, (item: Object, index: number) =>  index === rowIndex)[0];
    
    if (rowIndexData) {
      dispatch({ type: SETARRAYVALUE, data: rowIndexData  });
    
      if (firstNameState && firstNameState && idState) {
        // Populate Selected Row Data in the form
        setFirstName(`${firstNameState}`);
        setLastName(`${lastNameState}`);
        setId(idState);
        // Set Edited state to true
        setEdited(1);
      }
    }
    
   };

   const deleteActionColumnEvent = async ( event: any ) => {
    setModalName('is-active');  
    
     // Get Row index
     const rowIndexDelete: number = await ( event.target.parentElement.parentNode.parentElement.rowIndex) - 1;
   
     const rowIndexDataDelete = filter(CRUDSTATE.payload, (item: Object, index: number) =>  index === rowIndexDelete)[0];
    
     dispatch({ type: SETID, selectedData: rowIndexDataDelete  });
     
     if ( selectedIdState ) {
        setId(selectedIdState); 
        onConfirmYes(  );
     } else {
      setModalName('');
     }
   };

   const search = (event:React.ChangeEvent<HTMLInputElement>) => {
      setSearchKey( event.target.value );
      dispatch( GetInfo( searchKey, filteredByLastName ? 'last_name': 'first_name' ) );
   };

   const filtereChange = (event:React.ChangeEvent<HTMLInputElement>) => {
     if ( event.target.checked ) {
      setFilteredByLastName(1);
      dispatch( GetInfo( searchKey, 'last_name' ) );
     } else {
      setFilteredByLastName(0);
      dispatch( GetInfo( searchKey, 'first_name' ) );
     }
   }

  const data_index:object =  ['first_name', 'last_name']

 return  (
 
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Modal modaClassName={ modaClassName } modalHeadText="Confirm Delete" 
          isConfirmModal={true}
          onConfirmNo={onConfirmNo}
          onConfirmYes={onConfirmYes}>
        Are you sure you want to delete this data?
      </Modal>
      <Container className="is-max-widescreen form-div">
      <TextField id="id" value={id} readonly={true} type='hidden'/>
        <Label label="First Name"/>
        <FormControl>
          <TextField id="first_name" value={firstName} onChangeEvent={onChangeEventFirstName}/>
        </FormControl>
        <Label label="Last Name"/>
        <FormControl>
          <TextField id="last_name" value={lastName} onChangeEvent={onChangeEventLastName}/>
        </FormControl>
        <FormControl className="buttonFormControl">
          <Button className="is-primary" ButtonLabel={ `${edited ? 'Update': 'Submit' }`} onClick={ submitEvent }/>
          <Button className="is-primary" ButtonLabel="Reset" onClick={ resetEvent }/>
        </FormControl>
      </Container>

      <Container className="is-max-widescreen mt-2 table-div">
        <label className="checkbox">
          <input type="checkbox" value={filteredByLastName} onChange={filtereChange}/>
          Filtered By Last Name
        </label>
        <FormControl>
            <TextField id="search" value={searchKey} placeholder="Search" onChangeEvent={search}/>
        </FormControl>
        <Table 
          THeadcolumns={ [ 'First Name', 'Last Name' ] } 
          data={CRUDSTATE.payload} 
          data_index={data_index} 
          enableActionEdit={true}
          enableActionDelete={true}
          columnActionEditClick={editActionColumnEvent}
          columnActionDeleteClick={deleteActionColumnEvent}
        />
      </Container>
    </div>
)
};
