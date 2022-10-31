import React, { useState } from "react";
import Footer from "../../components/etc/Footer";
import Input from "../../components/etc/Input";

function MainPage() {
  const [value, setValue] = useState("");
  const changeValue= (e)=>{
    setValue(e.target.value);
  }
  
  return (
    <>
      <div>MainPage</div>
      <Footer />
      <Input width="100px" height="50px" placeholder="입력하세요" changeFunc={changeValue}/>
    </>
  );
}

export default MainPage;
