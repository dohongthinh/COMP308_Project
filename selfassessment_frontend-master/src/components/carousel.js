import React,{useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'

function Carousel1() {
//for carousel
const [index, setIndex] = useState(0);
const handleSelect = (selectedIndex, e) => {
  setIndex(selectedIndex);
};

    return (
  <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.profacts.be/uploads/general/shutterstock_1216683775-bis2.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.trentu.ca/futurestudents/sites/trentu.ca.futurestudents/files/styles/header_image/public/MedicalProfessionalsStrean_490543594.jpg.jpg?itok=FQ_pjG9G"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
)

};
export default Carousel1;