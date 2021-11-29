import ExternalLayout from "../Layouts/ExternalLayout/ExternalLayout";
import CreateTodo from "../Todo/CreateTodo/CreateTodo";
import TodoList from "../Todo/TodoList/TodoList";

const Dashboard = () => {
  return (
    <ExternalLayout>
      <CreateTodo />
      <TodoList />
    </ExternalLayout>
  );
};

export default Dashboard;
