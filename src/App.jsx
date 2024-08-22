import { React, useEffect, useState } from 'react'
import axios from "axios"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

//import "./style.css"
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import CreateData from './components/CreateData.jsx'
import ReadData from './components/ReadData.jsx'

// importing components

// make a call to backend

const App = () => {

    let [load, setLoad] = useState(false)

    let CallBackEnd = async () => {
        try {
            let result = await axios({
                method: "Get",
                url: "http://localhost:5500/api"
                // comment
            })

            console.log(result.data.message)

        } catch (err) {
            console.log("unable to get data from backend", err)
        }
    }

    let callFromCreateData = () => {
        setLoad(!load)
    }

    return (
        <div className="position-relative">
            <Header />

            <CreateData call={callFromCreateData} />

            <ReadData isload={load} call={callFromCreateData} />

            <Footer />
        </div>
    )
}

export default App

/*import { useState } from "react";

import "./App.css";
//import { Table } from "./components/Table";
//import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "101",
      description: "Yash Wadpalliwar",
      status: "live",
    },
    {
      page: "102",
      description: "Samruddhi",
      status: "live",
    },
    {
      page: "103",
      description: "ankit",
      status: "error",
    },
    {
      page: "104",
      description: "mayuri",
      status: "live",
    },
    {
      page: "105",
      description: "anu",
      status: "live",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <App rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <App
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;*/
