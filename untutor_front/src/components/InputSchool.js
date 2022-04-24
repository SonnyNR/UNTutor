import React from 'react'

function InputSchool(props) {

  const getInsti = (event)=>{
    const userPass = event.target.value;
    console.log(userPass); 
};

  return (props.trigger) ? (
    <input type="text" placeholder="Institución educativa" onChange={getInsti}/>
  ) : "";
}

export default InputSchool