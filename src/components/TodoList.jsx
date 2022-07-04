import { useState } from "react";
import "./style.css";
import moment from "jalali-moment";
import { Button, Modal, Popover } from "antd";
import "antd/dist/antd.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import svg from "./modal";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  // const [status, setStatus] = useState("انجام نشده");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const m = moment().locale("fa").format("YYYY/MM/DD HH:mm:ss");

  const hide = () => {
    setVisible(false);
  };
  const handleVisibleChange = (newVisible = true) => {
    setVisible(newVisible);
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
  const handleOk = (todo, e) => {
    setTodos([...todos, todo.content = e]);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleStatus (todo) {
    todo.status = "انجام شده"
  }

  const todopush = () => {
    if (inputValue.length === 0) {
      notify();
    } else {
      const creatTodo = {
        id: Math.random(),
        cretedAt: m,
        status: "انجام نشده",
        content: inputValue,
      };
      setTodos([...todos, creatTodo]);
      setInputValue("");
    }
  };

  const statusValue = (todo)=> {
    if (todo.status === "انجام نشده") {
      todo.status = "انجام نشده"
    }else{
      todo.status = "انجام شده"
    }
  } 

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
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
            <span className="todo-num">{index + 1}-</span>
            <span className="todo-work">{todo.content}</span>
            <span className="todo-time">{todo.cretedAt}</span>
            <span className="todo-status">{statusValue(todo)}</span>
            <Popover
              placement="left"
              content={
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button onClick={hide}>حذف</Button>
                  <Button onClick={showModal}>ویرایش</Button>
                  <Button onClick={()=> handleStatus(todo)}>انجام شده</Button>
                </div>
              }
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Button className="todo-options">{svg}</Button>
            </Popover>
            <Modal
              okText="تایید"
              visible={isModalVisible}
              onOk={() => handleOk(todo)}
              onCancel={handleCancel}
            >
              <input
                className="todo-input"
                type="text"
                defaultValue={todo.content}
                onChange={(e) => handleOk(e.target.value)}
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
