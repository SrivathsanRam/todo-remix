import { prisma } from "~/db.server";

export const getTodos = async ({ userId }: { userId: string }) => {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: [{ importance: "desc" }, { dueDate: "asc" }],
  });
};

export const delTodos = async ({ todoId }: { todoId: string }) => {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    return deletedTodo;
  } catch (error) {
    throw new Error("Error deleting todo");
  }
};

export const completeTodos = async ({ todoId }: { todoId: string }) => {
  console.log("COMPLETE")
  return prisma.todo.update({
    where: { id: todoId },
    data: { completed: true },
  });
};
