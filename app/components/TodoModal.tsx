import { useState } from "react";

export default function TodoModal({ todo, closeModal }: { todo?: any; closeModal: () => void }) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [dueDate, setDueDate] = useState(todo?.dueDate || "");
  const [importance, setImportance] = useState(todo?.importance || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to create or update the todo
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-4 shadow-lg space-y-4"
      >
        <h2 className="text-xl font-bold">{todo ? "Edit Todo" : "New Todo"}</h2>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border"
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border"
          />
        </label>
        <label>
          Due Date
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block w-full border"
          />
        </label>
        <label>
          Importance
          <input
            type="number"
            min="1"
            max="5"
            value={importance}
            onChange={(e) => setImportance(Number(e.target.value))}
            className="block w-full border"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeModal}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
          <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
