import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import Item from "../components/PageComponents/TodoComponents/Item";
import { v4 as uuidv4 } from "uuid";
import TitlePage from "../components/PageComponents/TitlePage";

const TodoList = () => {
  const initialState = () =>
    JSON.parse(
      typeof window !== "undefined" && localStorage.getItem("Tasks")
    ) || [];
  const [tasks, setTasks] = useState(initialState);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const inputRef = useRef(null);
  let date = new Date();
  let dateTimeNow = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const handleChange = (e) => {
    const { value } = e.target;
    setNewTask((prevState) => (prevState = value));
  };
  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask === "") return;
    if (!isEditing) {
      const newTaskArr = [
        ...tasks,
        {
          id: uuidv4(),
          desc: newTask,
          completed: false,
          dateCreated: dateTimeNow,
          dateCompleted: null,
        },
      ];
      setTasks((prevState) => (prevState = newTaskArr));
      setNewTask("");
      inputRef.current.focus();
    } else {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(editId);
      newArr.splice(index, 1, {
        id: editId,
        desc: newTask,
        completed: false,
        dateCreated: dateTimeNow,
        dateCompleted: null,
      });
      setTasks((prevState) => (prevState = newArr));
      setNewTask("");
      setEditId("");
      setIsEditing(false);
      inputRef.current.focus();
    }
  };
  //edit task
  const handleEdit = (id) => {
    const item = tasks.find((task) => task.id === id);
    setNewTask(item.desc);
    setIsEditing(true);
    setEditId(item.id);
    inputRef.current.focus();
  };
  //cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setNewTask("");
    setEditId("");
    inputRef.current.focus();
  };
  ///delete task
  const handleDelete = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };
  //done task
  const handleCheck = (desc, id, dateCreated) => {
    if (tasks.find((task) => task.id === id).completed) {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(id);
      newArr.splice(index, 1, {
        id,
        desc,
        dateCreated,
        completed: false,
        dateCompleted: null,
      });
      setTasks((prevState) => (prevState = newArr));
    } else {
      const newArr = tasks.slice();
      const indexArr = newArr.map((arr) => arr.id);
      const index = indexArr.indexOf(id);
      newArr.splice(index, 1, {
        id,
        desc,
        dateCreated,
        completed: true,
        dateCompleted: dateTimeNow,
      });
      setTasks((prevState) => (prevState = newArr));
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    localStorage.setItem("Tasks", JSON.stringify(items));
    setTasks(items);
  }
  return (
    <>
      <Layout>
      <TitlePage>Việc Cần Làm</TitlePage>
        <div className="max-w-lg bg-white  p-5 m-auto border border-black">
         
          <div>
            <textarea
              value={newTask}
              ref={inputRef}
              placeholder="Nhập công việc cần làm"
              onChange={handleChange}
              className="w-full px-2 py-3 text-xl border outline-none border-black mt-3"
            />
            {isEditing ? (
              <div className="flex">
                <button
                  onClick={handleSubmit}
                  className="w-full mr-2 py-2 mt-2 border border-black bg-black hover:bg-white hover:text-black text-white hover:shadow-blog-l hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200"
                >
                  Sửa nội dung
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 border mt-2 text-white border-black bg-red-600 hover:bg-red-500"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full py-2 mt-2 border border-black bg-black hover:bg-white hover:text-black text-white hover:shadow-blog-l hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200"
              >
                Thêm
              </button>
            )}
          </div>
          <div className="mt-10">
            {tasks.length > 0 ? (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map(
                        (
                          { id, desc, completed, dateCreated, dateCompleted },
                          index
                        ) => {
                          return (
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                <li
                                  className="mb-2"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Item
                                    id={id}
                                    handleCheck={handleCheck}
                                    desc={desc}
                                    dateCreated={dateCreated}
                                    completed={completed}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    dateCompleted={dateCompleted}
                                  />
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center">Khong Co Gi ¯\_(ツ)_/¯.</div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TodoList;
