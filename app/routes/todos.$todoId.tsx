import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const todo = await prisma.todo.findUnique({
    where: { id: params.todoId },
  });
  if (!todo) throw new Error("Todo not found");
  return json({ todo });
};

export default function TodoDetailsPage() {
  const { todo } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2 className="text-2xl font-bold">{todo.title}</h2>
      <p>{todo.description}</p>
      <p>
        Due: {new Date(todo.dueDate).toLocaleString()} | Importance:{" "}
        {todo.importance}
      </p>
    </div>
  );
}
