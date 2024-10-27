// src/Home.js
import React from "react";
import dog from "../data/dog.png";
import "./pictureMatching.css";
import BackButton from "../components/BackButton";
import { useState } from "react";

function PictureMatching() {
  const [sentence, setSentence] = useState("");
  const [response, setResponse] = useState("res");

  const sendPostRequest = async () => {
    const url = "http://localhost:5000/api/predict"; // Replace with your API endpoint
    const payload = {
      sentence1: sentence,
      sentence2: "Dog is looking the wall",
    };

    console.log(sentence);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      console.log(data);
      setResponse(data.result); // Save response data to state
    } catch (error) {
      console.error(error);
    }
  };

  function handleSubmit() {
    sendPostRequest();
  }

  function handleSentenceChange(e) {
    setSentence(e.target.value);
  }

  return (
    <div>
      <BackButton />

      <h1>Picture Matching</h1>
      <div className="images-div">
        <img src={dog}></img>
      </div>
      <div className="picture-matching-box">
        <textarea onChange={(e) => handleSentenceChange(e)}></textarea>
        <button onClick={(e) => sendPostRequest()}>Submit</button>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default PictureMatching;
