import { useEffect, useState } from "react";
import "./style.css";
import moment from "jalali-moment";

function TodoList(props) {
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
  }, []);

  const m = moment();
  m.locale("fa");
  m.format("YYYY-MM-DD");
  console.log();

  const value = (e) => {
    setInputValue(e.target.value);
  };

  const todos = [];

  const todopush = () => {
    const creatTodo = {
      id: Math.random(),
      cretedAt: { m },
      status: "انجام نشده",
      content: inputValue,
    };
    todos.push(creatTodo);
    console.log(todos);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="todo"
        >
          <input
            className="todoinput"
            type="text"
            onChange={value}
            placeholder="تسک مورد نظر را وارد کنید... "
          />
          <input
            onClick={todopush}
            className="todopushbtn"
            value="ثبت"
            type="submit"
          />
        </form>
      </div>
      <div className="todolist">
        
      </div>
    </div>
  );
}

export default TodoList;
