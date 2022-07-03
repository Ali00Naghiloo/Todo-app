import { useState } from "react";
import "./style.css";
import moment from "jalali-moment";
import { Button, Modal } from "antd";
import "antd/dist/antd.css";

function TodoList() {
  const [inputValue, setInputValue] = useState();
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("انجام نشده");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const m = moment().locale("fa").format("YYYY/MM/DD HH:mm:ss");

  const value = (e) => {
    return setInputValue(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  //   todo.value = inputValue;
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const todopush = () => {
    const creatTodo = {
      id: Math.random(),
      cretedAt: m,
      status: status,
      content: inputValue,
    };
    setTodos([...todos, creatTodo]);
    setInputValue("");
    console.log(inputValue);
  };

  const deletetodo = () => {
    console.log("hello");
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="todo-form"
        >
          <input
            className="todo-input"
            type="text"
            onChange={value}
            required
            placeholder="تسک مورد نظر را وارد کنید... "
          />
          <input
            onClick={todopush}
            className="todo-pushbtn"
            value="ثبت"
            type="submit"
          />
        </form>
      </div>
      <div className="todo-list">
        <div className="detail">
          <div className="detail-1">لیست تسک ها</div>
          <hr />
          <div className="detail-2">
            <span className="todo-title-task">تسک</span>
            <span className="todo-title-time">تاریخ ثبت</span>
            <span className="todo-title-status">وضعیت</span>
          </div>
        </div>
        {todos.map((todo, index) => (
          <div key={index} className="todo">
            <span className="todo-num">{index + 1}-</span>
            <span className="todo-work">{todo.content}</span>
            <span className="todo-time">{todo.cretedAt}</span>
            <span className="todo-status">{todo.status}</span>
            {/* <select name="hello" id="">
              <option onClick={deletetodo} value="1">
                حذف
              </option>
              <option value="2">ویرایش</option>
              <option value="3">انجام شده</option>
            </select> */}
            <span onClick={showModal}>
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                class="octicon octicon-kebab-horizontal"
              >
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
            </span>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={(todo)=> {
                setIsModalVisible(false);
              }}
              onCancel={handleCancel}
            >
              <input
                className="todo-input"
                type="text"
                value={todo.content}
                placeholder="تسک مورد نظر را وارد کنید... "
              />
            </Modal>
          </div>
        ))}
        <div className="detail-btm"></div>
      </div>
    </>
  );
}

export default TodoList;
