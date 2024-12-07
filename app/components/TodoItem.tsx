export default function TodoItem({
    id,
    title,
    description,
    dueDate,
    importance,
    completed,
    onDelete,
    onEdit,
    onComplete,
  }: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    importance: number;
    completed: boolean;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onComplete: (id: string) => void;
  }) {
    return (
      <li className="flex items-center justify-between border p-4">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p>{description}</p>
          <p className="text-sm text-gray-600">
            Due: {new Date(dueDate).toLocaleString()} | Importance: {importance}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onComplete(id)}
            className={`rounded px-4 py-2 ${
              completed ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {completed ? "Completed" : "Complete"}
          </button>
          <button
            onClick={() => onEdit(id)}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
  