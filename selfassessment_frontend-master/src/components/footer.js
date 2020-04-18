import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Footer(){


  return (
    <Card className="text-center">
  <Card.Header>Footer</Card.Header>
  <Card.Body>
    <Card.Title>Footer</Card.Title>
    <Card.Text>
     Thanks for Visit
    </Card.Text>
    
  </Card.Body>
  <Card.Footer className="text-muted">Copyright</Card.Footer>
</Card>
  ) 
};

export default Footer;