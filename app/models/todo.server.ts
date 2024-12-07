import { prisma } from "~/db.server";

export const getTodos = async ({ userId }: { userId: string }) => {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: [{ importance: "desc" }, { dueDate: "asc" }],
  });
};
