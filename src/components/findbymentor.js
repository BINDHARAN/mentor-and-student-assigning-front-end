import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { mentorapi } from "./mentor";
import { api } from "./student";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function FindByMentor({ color }) {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  function getMentors() {
    fetch(`${mentorapi}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setMentors(res))
      .then((res) => console.log(res));
  }
  useEffect(() => {
    getMentors();
  }, []);

  const [mentorId, setMentorId] = useState("");
  const handleMentorChange = (event) => {
    setMentorId(event.target.value);
    console.log(event.target.value);
  };
  function getStudents() {
    fetch(`${api}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setStudents(res))
      .then((res) => console.log(res));
  }
  useEffect(() => {
    getStudents();
  }, []);

  // const [show,setShow]=useState(false)

  const findByMentor = async () => {
    //  console.log("students", students);
    if (mentorId === "") {
      alert("please select a mentor");
    } else {
      setFilterStudents(students.filter((e) => e.mentorId === mentorId));

      //  console.log("filterstudnts", filterStudents);
    }
  };

  //console.log(filterStudents)

  return (
    <div style={{ marginTop: "90px" }}>
      <div className="findmentor-fromcontrol">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Select Mentor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mentorId}
            label="Select Mentor"
            onChange={handleMentorChange}
          >
            {mentors.map((e, index) => (
              <MenuItem value={e.mentorId} key={index}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          id="findStudents"
          onClick={findByMentor}
          variant="contained"
          ccolor="primary"
        >
          Find Students
        </Button>
      </div>

      {filterStudents.length !== 0 ? (
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell align="center">Name</TableCell>

                  <TableCell align="center">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterStudents.map(
                  ({ name, surname, email, mentorId, _id }, index) => (
                    <FilterStudents
                      key={index}
                      name={name}
                      surname={surname}
                      email={email}
                      mentorid={mentorId}
                      color={color}
                      id={_id}
                      index={index}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function FilterStudents({ name, surname, email, color, index }) {
  const num = index + 1;

  return (
    <>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {num}
        </TableCell>
        <TableCell align="center">{name + " " + surname}</TableCell>
        <TableCell align="center">{email}</TableCell>
      </TableRow>
    </>
  );
}
