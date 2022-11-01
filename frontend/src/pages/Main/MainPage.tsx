import React, { useState } from "react";
import Footer from "../../components/etc/Footer";
import CreateMapModalPc from "../../components/modal/CreateMapModalPc";
import Modal from "../../components/modal/Modal";
function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const changeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>MainPage</div>
      <CreateMapModalPc />
      <button type="button" onClick={() => setIsOpen(true)}>
        Click to Open Modal
      </button>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        This is Modal Content!
      </Modal>
      <Footer />
    </>
  );
}

export default MainPage;
