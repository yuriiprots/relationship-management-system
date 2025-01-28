import React from "react";

export default function InteractionTable({ interactionsData }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Interaction History</h2>
      <table>
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">№</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Mood</th>
            <th className="border border-gray-300 p-2">Person</th>
            <th className="border border-gray-300 p-2">Emotion</th>
            <th className="border border-gray-300 p-2">Summary</th>
          </tr>
        </thead>
        <tbody>
          {interactionsData.map((interaction, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">
                {interactionsData.length - index}
              </td>
              <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                {interaction.date}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {interaction.mood}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {interaction.person}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {interaction.emotion}
              </td>
              <td
                className="border border-gray-300 p-2 text-center break-word"
                style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
              >
                {interaction.summary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
