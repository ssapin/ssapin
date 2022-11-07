import React, { useState } from "react";
import NewPlace from "../NewPlace/TogetherNewPlacePage";

function SearchPlace() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ zIndex: 100, position: "fixed" }}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <NewPlace searchPlace={place} />
    </>
  );
}

export default SearchPlace;
