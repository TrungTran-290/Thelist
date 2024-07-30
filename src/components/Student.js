import React from "react";
import {Button} from "reactstrap"
import { deleteList,toggleChecked  } from "../redux/listSlice";
import { useDispatch } from "react-redux";
export default function Student(props) {
    const {students} = props
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(toggleChecked(students.id));
      };
  return (
    <tr className={students.checked ? 'active' : ''}>
               <input
          type="checkbox"
          checked={students.checked}
          onChange={handleToggle}
        />
      <td>{students.name}</td>
      <td>{students.age}</td>
      <td>{students.checked?"true":"false"}</td>
      <Button onClick={()=>dispatch(deleteList(students.id))} >Delete</Button>
    </tr>
  );
}
