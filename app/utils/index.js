import moment from "moment";

// method to sort tasks based on different criterias
export const sortTasks = (tasks, criterion) => {
    return tasks.sort((a, b) => {
      if (criterion === "dueDate") {
        return moment(a.dueDate).diff(moment(b.dueDate));
      } else if (criterion === "createdAt") {
        return moment(a.createdAt).diff(moment(b.createdAt));
      } else if (criterion === "isPriority") {
        return b.isPriority - a.isPriority; // Higher priority first
      }
    });
  };

//   method to separate todos based on their category
export const handleTaskCategory = (category, setCategory, setPendingTodos, setCompletedTodos, todos) => {
  console.log("handling category: ", category);

  setCategory(category);
  let categorizedTodos = todos.filter((todo) => todo.category === category);
  console.log(categorizedTodos);
  

  if (category === "All") categorizedTodos = [...todos];

  const pendingTasks = categorizedTodos.filter(
    (todo) => todo.status !== "completed"
  );
  const completed = categorizedTodos.filter(
    (todo) => todo.status === "completed"
  );

  setPendingTodos(pendingTasks);
  setCompletedTodos(completed);
};