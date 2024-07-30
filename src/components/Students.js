import React, { useEffect, useState } from "react";
import Student from "./Student";
import { useDispatch, useSelector } from "react-redux";
import { setStudents, addStudent } from "../redux/listSlice";
import axios from "axios";
import { Input, Table, Button, Container } from "reactstrap";
export default function Students() {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const url = "https://66a4b7905dc27a3c19099dcf.mockapi.io/Students";
  const getList = () => {
    axios
      .get(url)
      .then(function (res) {
        dispatch(setStudents(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [flag,setFlag]=useState("")
  const filterList=(list,flag)=>{
    if (flag=="Checked"){
      return list.filter(item=>item.checked)
    }
    else if (flag=="UnChecked"){
      return list.filter(item=>!item.checked)
    }
    else {
        return list
    }
  }
  useEffect(() => {
    getList();
  }, []);
  return (
    <Container fluid>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody className="">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setText("");
                dispatch(addStudent(text));
              }
            }}
          />
          {filterList(students,flag).map((item, index) => (
            <Student key={index} students={item} />
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
      <button onClick={()=>{setFlag("Checked")}}>Checked</button>
      <button onClick={()=>{setFlag("UnChecked")}}>UnChecked</button>
      <button onClick={()=>{setFlag("Clear")}}>Clear</button>
      </div>
    </Container>
  );
}
