import { format, isSameDay, parseISO } from "date-fns";
import { useState } from "react";

import { Calendar } from "./ui/calendar";

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  importance: number;
  completed: boolean;
}

interface TodoCalendarProps {
  todos: Todo[];
}

export default function TodoCalendar({ todos }: TodoCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get unique dates with tasks
  const taskDates = Array.from(
    new Set(todos.map((todo) => format(parseISO(todo.dueDate), "yyyy-MM-dd")))
  );

  // Filter tasks for the selected date
  const tasksForSelectedDate = todos.filter((todo) =>
    selectedDate ? isSameDay(parseISO(todo.dueDate), selectedDate) : false
  );

  return (
    <div className="flex flex-col items-center p-4">
      <Calendar
      mode="single"
        onSelect={(date) => {console.log(date); setSelectedDate(date)}}
        modifiers={{
          highlighted: (date) =>
            taskDates.includes(format(date, "yyyy-MM-dd")),
        }}
        modifiersClassNames={{
          highlighted: "bg-blue-500 text-white rounded-full",
        }}
      />

      <div className="mt-4 w-full">
        <h2 className="text-xl font-bold text-center">
          {selectedDate
            ? `Tasks for ${format(selectedDate, "MMMM dd, yyyy")}`
            : "Select a date"}
        </h2>

        {tasksForSelectedDate.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {tasksForSelectedDate.map((todo) => (
              <li
                key={todo.id}
                className="p-4 border rounded shadow hover:shadow-md"
              >
                <h3 className="font-bold">{todo.title}</h3>
                <p>{todo.description}</p>
                <p className="text-sm text-gray-600">
                  Importance: {todo.importance}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {todo.completed ? "Completed" : "Pending"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          selectedDate && (
            <p className="mt-2 text-gray-500">No tasks for this date.</p>
          )
        )}
      </div>
    </div>
  );
}
