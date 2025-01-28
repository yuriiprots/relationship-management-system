import React, { useState } from "react";
import FormInput from "./FormInput";

export default function InteractionForm({ onClose, addInteraction }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], 
    mood: "",
    person: "",
    emotion: "",
    summary: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const formattedDate = formatDate(formData.date);

    const newData = { ...formData, date: formattedDate, id: Date.now() };
    console.log(newData);

    addInteraction(newData);
    onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 backdrop-blur-xs flex justify-center items-center"
      onClick={handleClose}
    >
      <form
        className="flex flex-col w-96 bg-white px-6 py-0 rounded-lg shadow-lg
        
    "
        onSubmit={handleSubmit}
      >
        <button
          className="self-end text-bold text-2xl text-gray-500 hover:text-gray-700"
          type="button"
          onClick={() => onClose()}
        >
          &times;
        </button>

        <h1 className="text-lg font-bold ">Interaction</h1>

        <FormInput
          type="date"
          label="Date:"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <label>Mood:</label>

          {["good", "neutral", "bad"].map((mood) => (
            <div key={mood} className="mb-2">
              <input
                type="radio"
                id={`moodChoice_${mood}`}
                name="mood"
                value={mood}
                checked={formData.mood === mood}
                onChange={handleChange}
                required
              />
              <label className="pl-2" htmlFor={`moodChoice_${mood}`}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </label>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-col">
          <label>Mood:</label>
          <div className="mb-2">
            <input type="radio" id="moodChoice1" name="mood" value="good" />
            <label className="pl-2">Good</label>
          </div>
          <div className="mb-2">
            <input type="radio" id="moodChoice2" name="mood" value="neutral" />
            <label className="pl-2">Neutral</label>
          </div>
          <div className="mb-2">
            <input type="radio" id="moodChoice3" name="mood" value="bad" />
            <label className="pl-2">Bad</label>
          </div>
        </div> */}

        <FormInput
          type="text"
          label="Person:"
          name="person"
          value={formData.person}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <label>Emotion:</label>
          {["pleasantly", "unpleasantly"].map((emotion) => (
            <div key={emotion} className="mb-2">
              <input
                type="radio"
                id={`emotionChoice_${emotion}`}
                name="emotion"
                value={emotion}
                checked={formData.emotion === emotion}
                onChange={handleChange}
                required
              />
              <label className="pl-2" htmlFor={`emotionChoice_${emotion}`}>
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </label>
            </div>
          ))}
        </div>

        {/* <div className="flex flex-col">
          <label>Emotion:</label>
          <div className="mb-2">
            <input
              type="radio"
              id="emotionChoice1"
              name="emotion"
              value="pleasantly"
            />
            <label className="pl-2">Pleasantly</label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              id="emotionChoice2"
              name="emotion"
              value="unpleasantly"
            />
            <label className="pl-2">Unpleasantly</label>
          </div>
        </div> */}

        <div className="flex flex-col ">
          <label>Summary:</label>
          <textarea
            className="border border-gray-300 p-2 my-2 rounded"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full mt-2 mb-4 py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white font-bold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
