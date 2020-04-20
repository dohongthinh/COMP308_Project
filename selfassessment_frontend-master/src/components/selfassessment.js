import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SelfAssessment(props) {
    const [data, setData] = useState({
        cough: '', 
        fever: '', 
        headache: '',
        fatigue: '',
        nausea: ''
    });

    const [message, setMessage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:5000/predict";

    const saveData = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const input = {
           cough: data.cough, 
            fever: data.fever,
            fatigue: data.fatigue,
            headache: data.headache,
            nausea: data.nausea
        }
        axios.post(apiUrl, input)
        .then((res) => {
            setShowLoading(false);
            if(res.data.condition == 'positive')
            {
                window.alert("You are not okay! \nPlease visit your doctor!");
                setMessage("You are not okay! \nPlease visit your doctor!.");
            }
            else if(res.data.condition == 'negative')
            {
                window.alert("Your result is good. \nStay at home!");
                setMessage("Your result is good. \nStay at home! ");
            }
             
        }).catch((error) => setShowLoading(false));
    }

    const onChange = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            
        <div class="container-fluid">
            <h1>Symptoms Checklist</h1>
            <h2>Please select all symptoms that you are experiencing</h2>
            <br/>
            <h2 id="message">{message}</h2>
            <br/>
            <Form onSubmit={saveData}>
                <Form.Group>
                        <Form.Label>Cough</Form.Label>
                        <Form.Check type="radio" label="No" name="cough" id="cough" value="0" onChange={onChange}/>
                        <Form.Check type="radio" label="Yes" name="cough" id="cough" value="1" onChange={onChange}/>
                </Form.Group>
                    <Form.Group>
                        <Form.Label> Fever</Form.Label>
                        <Form.Check type="radio" label="No" name="fever" id="fever" value="0" onChange={onChange}/>
                        <Form.Check type="radio" label="Yes" name="fever" id="fever" value="1" onChange={onChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Headache</Form.Label>
                        <Form.Check type="radio" label="No" name="headache" id="headache" value="0" onChange={onChange}/>
                        <Form.Check type="radio" label="Yes" name="headache" id="headache" value="1" onChange={onChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fatigue</Form.Label>
                        <Form.Check type="radio" label="No" name="fatigue" id="fatigue" value="0" onChange={onChange}/>
                        <Form.Check type="radio" label="Yes" name="fatigue" id="fatigue" value="1" onChange={onChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nausea</Form.Label>
                        <Form.Check type="radio" label="No" name="nausea" id="nausea" value="0" onChange={onChange}/>
                        <Form.Check type="radio" label="Yes" name="nausea" id="nausea" value="1" onChange={onChange}/>
                    </Form.Group>
                  
                    <Button variant="primary" type="submit">Diagnose</Button>
            </Form>
        </div>
        </div>
    )
}

export default SelfAssessment;