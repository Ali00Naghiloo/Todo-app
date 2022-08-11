import "./style.css";
import { useState, useEffect } from "react";
import moment from "jalali-moment";
import { Button, Modal, Popover } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../features/addTodoSlice";
// import { setChangedInputValue } from "../features/changeTodoSlice";
import { setTodos } from "../features/todoSlice";
import { setIsModalVisible } from "../features/modalSlice";
import { setUpdateUi } from "../features/updateUiSlice";
import svg from "./source";

function TodoList() {
  const [changedInput, setChangedInput] = useState("");
  const [updateUi, setUpdateUi] = useState(true);
  const m = moment().locale("fa").format("YYYY/MM/DD HH:mm:ss");

  const inputValue = useSelector((state) => state.todoValue.inputValue);
  // const changedInputValue = useSelector(
  //   (state) => state.changeTodoValue.changedInputValue
  // );
  const todos = useSelector((state) => state.todos.todos);
  const isModalVisible = useSelector(
    (state) => state.modalVisible.isModalVisible
  );
  // const updateUi = useSelector((state) => state.updatingUI.updateUi);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("todosSaved")) {
      dispatch(setTodos(JSON.parse(localStorage.getItem("todosSaved"))));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.removeItem("todosSaved");
  // }, [todos]);

  useEffect(() => {
    if (updateUi === false) {
      setUpdateUi(true);
    }
  }, [updateUi]);

  const showModal = () => {
    dispatch(setIsModalVisible(true));
  };
  const handleOk = (todo) => {
    todos.map((td) => {
      if (td.id === todo.id) {
        if (changedInput.length !== 0) {
          return (
            (td.content = changedInput),
            // dispatch(setChangedInputValue("")),
            toast.success("با موفقیت بروزرسانی شد!"),
            setChangedInput(""),
            dispatch(setIsModalVisible(false))
          );
        } else {
          toast.warn("لطفا فرم را پر کنید!");
        }
      }
    });
  };
  const handleCancel = () => {
    setChangedInput("");
    dispatch(setIsModalVisible(false));
  };

  const notify = () => {
    toast.warn("لطفا فرم را پر کنید!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const todopush = () => {
    if (inputValue.length === 0) {
      notify();
    } else {
      const creatTodo = {
        id: Math.random().toFixed(3) * 1000,
        cretedAt: m,
        status: 1,
        content: inputValue,
      };
      dispatch(setTodos([...todos, creatTodo]));
      dispatch(setInputValue(""));
      const todoList = JSON.stringify(todos);
      localStorage.setItem("todosSaved", todoList);
    }
  };

  const handleStatus = (todo) => {
    todos.map((td) => {
      if (td.id === todo.id) {
        if (todo.status === 0) {
          return todo.status === 1;
        } else {
          return todo.status === 0;
        }
      }
      setUpdateUi(false);
    });
  };

  const handleFilter = (todo) => {
    dispatch(setTodos(todos.filter((td) => todo.id !== td.id)));
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
            onChange={(e) => dispatch(setInputValue(e.target.value))}
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
      {updateUi && (
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
              <span className="todo-status">
                {todo.status === 0 ? "انجام نشده" : "انجام شده"}
              </span>

              <Popover
                placement="left"
                trigger="click"
                content={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button onClick={() => handleFilter(todo)}>حذف</Button>
                    <Button onClick={showModal}>ویرایش</Button>
                    <Button onClick={() => handleStatus(todo)}>
                      {todo.status === 0 ? "انجام شده" : "انجام نشده"}
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
                        // onChange={(e) => dispatch(setChangedInputValue(e.target.value))}
                        onChange={(e) => setChangedInput(e.target.value)}
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
        </div>
      )}
    </>
  );
}

export default TodoList;
