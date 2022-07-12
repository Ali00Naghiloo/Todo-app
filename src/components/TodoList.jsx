import { useState, useEffect } from "react";
import "./style.css";
import moment from "jalali-moment";
import { Button, Modal, Popover } from "antd";
import "antd/dist/antd.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import svg from "./source";
import { useSelector, useDispatch } from "react-redux";
import { increment, deleteValue } from "../features/slice";
// import {check} from "../Assets/Check.svg";
// import {x} from "../Assets/x.svg";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [changedValue, setChangedValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("انجام نشده");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const m = moment().locale("fa").format("YYYY/MM/DD HH:mm:ss");

  const inputV = useSelector((state) => state.value.todo);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const todoList = todos.toString();
      localStorage.setItem("todosSaved" , todoList);
    },
    [todos]
  );

  const tdFilter = (todos) => {
    return todos.filter((todo, id) => {
      console.log(todo);
    });
  };

  const notify = () => {
    toast.warn("لطفا فرم را پر کنید!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = (todo) => {
    todo.content(changedValue);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const todopush = () => {
    if (inputValue.length === 0 || inputValue === null) {
      notify();
    } else {
      const creatTodo = {
        id: Math.random().toFixed(3) * 1000,
        cretedAt: m,
        status,
        content: inputValue,
      };
      setTodos([...todos, creatTodo]);
      setInputValue("");
    }
  };

  const statusValue = (todo) => {
    if (todo === "انجام نشده") {
      setStatus("انجام شده");
    } else {
      setStatus("انجام نشده");
    }
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          limit={5}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="todo-form"
        >
          <input
            className="todo-input"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
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
            <span className="todo-num">{index + 1} _ </span>
            <span className="todo-work">{todo.content}</span>
            <span className="todo-time">{todo.cretedAt}</span>
            <span className="todo-status">{status}</span>
            <Popover
              placement="left"
              trigger="click"
              content={
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    onClick={() =>
                      todos.filter((todo, x) => {
                        return setTodos([todo]);
                      })
                    }
                  >
                    حذف
                  </Button>
                  <Button onClick={showModal}>ویرایش</Button>
                  <Button onClick={() => statusValue(status)}>
                    {status === "انجام نشده" ? "انجام شده" : "انجام نشده"}
                  </Button>
                  <Modal
                    okText="تایید"
                    cancelText="انصراف"
                    visible={isModalVisible}
                    onOk={() => handleOk(todo)}
                    onCancel={handleCancel}
                  >
                    <input
                      className="todo-input"
                      type="text"
                      defaultValue={todo.content}
                      onChange={(e) => setChangedValue(e.target.value)}
                      placeholder="تسک مورد نظر را وارد کنید... "
                    />
                  </Modal>
                </div>
              }
            >
              <Button type="primary" className="todo-options">
                {svg}
              </Button>
            </Popover>
          </div>
        ))}
        <div className="detail-btm"></div>
        <button onClick={() => console.log(todos)}>click</button>
      </div>
    </>
  );
}

export default TodoList;
