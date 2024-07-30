import { createSlice } from '@reduxjs/toolkit'
const initialState={
    students:[]
}
export const listSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents:(state,action)=>{
        state.students=action.payload;
    },
    deleteList:(state,action)=>{
        state.students= state.students.filter(item=>item.id!==action.payload)
    },
    toggleChecked: (state, action) => {
      const student = state.students.find(student => student.id === action.payload);
      if (student) {
        student.checked = !student.checked;
      }
    },
    addStudent(state,action){
      const highestId = state.students.reduce((a, b) => Math.max(b.id, a), 0);
      const newStudent = {
        id: highestId + 1,
        name: action.payload,
        checked: false,
      };
      state.students.push(newStudent);
    },
  }
})

export const {setStudents, deleteList,addStudent,toggleChecked } = listSlice.actions

export default listSlice.reducer