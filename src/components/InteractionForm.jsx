import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";

export default function InteractionForm({
  onClose,
  addInteraction,
  editingInteraction,
  updateInteraction,
}) {
  const [formData, setFormData] = useState(
    editingInteraction || {
      date: new Date().toISOString().split("T")[0],
      mood: "",
      person: "",
      emotion: "",
      summary: "",
    },
  );

  useEffect(() => {
    if (editingInteraction) setFormData(editingInteraction);
  }, [editingInteraction]);

  const [mouseDownInside, setMouseDownInside] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newFormData = {
    //   ...formData,
    //   id: Date.now().toString(),
    // };

    editingInteraction ? updateInteraction(formData) : addInteraction(formData);
    onClose();
  };

  const handleMouseDown = (e) => {
    e.target.closest("form")
      ? setMouseDownInside(true)
      : setMouseDownInside(false);
  };

  const handleMouseUp = (e) => {
    if (!mouseDownInside && e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <form
        className="flex w-96 flex-col rounded-lg bg-white px-6 py-0 shadow-lg"
        onSubmit={handleSubmit}
      >
        <button
          className="text-bold self-end text-2xl text-gray-500 hover:text-gray-700"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>

        <h1 className="text-lg font-bold">Interaction</h1>

        <FormInput
          type="date"
          label="Date:"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
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

        <FormInput
          type="text"
          label="Person:"
          name="person"
          value={formData.person}
          onChange={handleChange}
          required
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

        <div className="flex flex-col">
          <label>Summary:</label>
          <textarea
            className="my-2 rounded border border-gray-300 p-2"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-2 mb-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
