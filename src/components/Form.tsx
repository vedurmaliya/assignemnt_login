import { FormControl, InputLabel, Input, Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function formIn() {

    const [name, setName] = useState("");
    const [phno, setNo] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState(false);

    return <div className='flex flex-row flex-wrap h-screen w-full content-center justify-center'>
        <form action="" className='flex flex-col flex-wrap h-72 w-64 bg-slate-300 content-center justify-evenly rounded-lg drop-shadow-lg'>
            <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input name='nameof' id="name" value={name} onChange={(e) => {
                    setName(e.target.value)
                }} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="no">Phone Number</InputLabel>
                <Input type="number" name='noof' id="no" value={phno} onChange={(e) => {
                    setNo(e.target.value) 
                }} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input type='email' name='emailof' id="email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />
            </FormControl>
            
            <Button onClick={() => {
                if (name != "" && phno != "" && email != "") {
                    localStorage.setItem('Name', JSON.stringify(name));
                    localStorage.setItem('Phno', JSON.stringify(phno));
                    localStorage.setItem('Email', JSON.stringify(email));
                    setLogin(true);
                }
                else {
                    alert("Please enter the specified details!!!");
                    setName('');
                    setNo('');
                    setEmail('');
                    setLogin(false);
                }
            }}> {login ? <Link className='flex flex-row content-center justify-center' to='/component1'>Submit</Link> : <div>Submit</div>} </Button>
        </form>
    </div>
}

export default formIn;