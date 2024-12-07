import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: { request: Request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const completed = false;
  const dueDate = formData.get("dueDate") as string;
  const importance = parseInt(formData.get("importance") as string, 10);

  if (!title || !description || isNaN(importance)) {
    return { error: "All fields are required" };
  }

  await prisma.todo.create({
    data: { title, description, dueDate: new Date(dueDate),completed, importance, userId },
  });
  

  return null
};

export default function NewTodoPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
    {submitted ? (
      <h1>Your todo has been successfully added</h1>
    ) : 
    (<Form onSubmit={()=>setSubmitted(!submitted)} method="post" className="space-y-4">
      <label>
        Title:
        <input type="text" name="title" className="block w-full border" required />
      </label>
      <label>
        Description:
        <textarea name="description" className="block w-full border" required />
      </label>
      <label>
        Due Date:
        <input type="datetime-local" name="dueDate" className="block w-full border" required />
      </label>
      <label>
        Importance (1-5):
        <input type="number" name="importance" min="1" max="5" className="block w-full border" required />
      </label>
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
        Create Todo
      </button>
    </Form>)}
    </>
  );
}
