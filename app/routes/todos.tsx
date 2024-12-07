import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useFetcher, useLoaderData } from "@remix-run/react";

import TodoCalendar from "~/components/TodoCalendar";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogFooter } from "~/components/ui/dialog";
import { getTodos , delTodos , completeTodos } from "~/models/todo.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const todos = await getTodos({ userId });
  return json({ todos });
};



const handleComplete = async (todoId: string) => {
  try {
    await completeTodos({ todoId });
  } catch (error) {
    console.error('Error completing todo:', error);
  }
};

const handleDelete = async (todoId: string) => {
  await delTodos({todoId: todoId});
}; 

export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = new URLSearchParams(await request.text());
  const todoId = formData.get("todoId");
  const actionType = formData.get("actionType"); // Check the action type (delete or complete)

  if (!todoId) {
    return json({ error: "Todo ID is missing" }, { status: 400 });
  }

  if (actionType === "complete") {
    await completeTodos({todoId}); // Mark the todo as complete
    return redirect("/todos"); // Redirect after completion
  } else if (actionType === "delete") {
    await delTodos({todoId}); // Delete the todo
    return redirect("/todos"); // Redirect after deletion
  }

  return json({ error: "Invalid action type" }, { status: 400 });
};

export default function TodosPage() {

  const data = useLoaderData<typeof loader>();
  const user = useUser();
  const fetcher = useFetcher();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          Todo
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Dialog>
          <DialogTrigger asChild>
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Todo
          </Link>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Outlet/>
          </DialogContent>
          </Dialog>
          <p>Completed Tasks:</p>
          <div className="overflow-y-scroll h-80">
          <hr />

          {data.todos.length === 0 ? (
            <p className="p-4">No todos yet</p>
          ) : (
            <ol>
              {data.todos.map((todo) => (
                todo.completed &&
                <li key={todo.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={todo.id}
                  >
                    {todo.completed ? '🟢' : '🔴'} {todo.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
          </div>
        </div>

        <div className="flex-auto p-6">
        <p>Todos:</p>
          <div className="overflow-y-scroll h-80">
          <hr />

          {data.todos.length === 0 ? (
            <p className="p-4">No todos yet</p>
          ) : (
            <ol>
              {data.todos.map((todo) => (
                !todo.completed &&
                <li key={todo.id}>
                  <Dialog>
                    <DialogTrigger asChild>
                  <Link
                    className="block border-b p-4 text-xl bg-white"
                    to={todo.id}
                  >
                    {todo.completed ? '🟢' : '🔴'} {todo.title}
                  </Link>
                  </DialogTrigger>
                  <DialogContent>
                    <Outlet/>
                    <DialogFooter>
                    <DialogClose asChild>
                    <fetcher.Form method="post" action="/todos">
              <input type="hidden" name="todoId" value={todo.id} />
              <input type="hidden" name="actionType" value="complete" />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
              >
                Complete
              </button>
            </fetcher.Form>
                    </DialogClose>
                    <DialogClose asChild>
                    <fetcher.Form method="post" action="/todos">
            <input type="hidden" name="todoId" value={todo.id} />
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </fetcher.Form>
                    </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ol>
          )}
          </div>
          
          
        </div>

        {/* Last Column */}
        <div className="flex-1 ">
        
        <TodoCalendar todos={data.todos} />
        </div>
      </main>
    </div>
  );
}
