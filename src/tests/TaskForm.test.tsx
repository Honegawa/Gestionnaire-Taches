// import App from "../App";
import TaskForm from "../components/Task/TaskForm";
import { Category } from "../interfaces/category";
import { Task } from "../interfaces/task";
import store from "../redux/store";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AuthProvider } from "../utils/context/AuthContext";
import { Provider } from "react-redux";

describe("TaskForm", () => {
  const data: Task = {
    id: 1,
    title: "title1",
    content: "content1",
    priority: 1,
    category: { id: 1, name: "cat1" },
    categoryId: 1,
    done: true,
    expiration: "",
  };

  const tasks: Task[] = [
    {
      id: 1,
      title: "title1",
      content: "content1",
      priority: 1,
      category: { id: 1, name: "cat1" },
      categoryId: 1,
      done: true,
      expiration: "2023-04-24T15:04:11.952Z",
    },
    {
      id: 2,
      title: "title2",
      content: "content2",
      priority: 2,
      category: { id: 2, name: "cat2" },
      categoryId: 2,
      done: true,
      expiration: "2024-04-24T15:04:11.952Z",
    },
  ];

  const categories: Category[] = [
    { id: 1, name: "cat1" },
    { id: 2, name: "cat2" },
    { id: 3, name: "cat3" },
  ];

  const onComplete = () => {
    console.log("complete");
  };

  it("Renders TaskForm as a create form", () => {
    const { container } = render(
      <Provider store={store}>
        <AuthProvider>
          <TaskForm categories={categories} onComplete={onComplete} />
        </AuthProvider>
      </Provider>
    );

    const titleInput = container.querySelector('input[name="title"]');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue("");

    const contentInput = container.querySelector('textarea[name="content"]');
    expect(contentInput).toBeInTheDocument();
    expect(contentInput).toHaveValue("");

    const prioritySelect = container.querySelector('select[name="priority"]');
    expect(prioritySelect).toBeInTheDocument();
    expect(prioritySelect).toHaveValue("");

    const categorySelect = container.querySelector('select[name="category"]');
    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveValue("");

    const expirationInput = container.querySelector('input[name="expiration"]');
    expect(expirationInput).toBeInTheDocument();
    expect(expirationInput).toHaveValue("");

    const doneInput = container.querySelector('input[name="done"]');
    expect(doneInput).toBeInTheDocument();
    expect(doneInput).not.toBeChecked();
  });

  it("Renders TaskForm as a update form", () => {
    const { container } = render(
      <Provider store={store}>
        <AuthProvider>
          <TaskForm
            data={data}
            tasks={tasks}
            categories={categories}
            onComplete={onComplete}
          />
        </AuthProvider>
      </Provider>
    );

    const titleInput = container.querySelector('input[name="title"]');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(data.title);

    const contentInput = container.querySelector('textarea[name="content"]');
    expect(contentInput).toBeInTheDocument();
    expect(contentInput).toHaveValue(data.content);

    const prioritySelect = container.querySelector('select[name="priority"]');
    expect(prioritySelect).toBeInTheDocument();
    expect(prioritySelect).toHaveValue(data.priority.toString());

    const categorySelect = container.querySelector('select[name="category"]');
    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveValue(data.categoryId.toString());

    const expirationInput = container.querySelector('input[name="expiration"]');
    expect(expirationInput).toBeInTheDocument();
    expect(expirationInput).toHaveValue(data.expiration.substring(0, 10));

    const doneInput = container.querySelector('input[name="done"]');
    expect(doneInput).toBeInTheDocument();
    expect(doneInput).toBeChecked();
  });
});
