import todoValue from "../features/addTodoSlice";
import changeTodoValue from "../features/changeTodoSlice";
import todos from "../features/todoSlice";
import modalVisible from "../features/modalSlice";
import updatingUI from "../features/updateUiSlice";

const rootReducer = {
    todoValue,
    changeTodoValue,
    todos,
    modalVisible,
    updatingUI,
}

export default rootReducer