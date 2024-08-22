import axios from "axios";
//import {deleteData} from './DeleteData.js'

let deleteData = async (name, id) => {
  try {
    alert(`you are trying to delete ${name} !`);

    let result = await axios({
      url: `http://localhost:5500/delete/${id}`,
      method: "delete",
    });

    if (result.status == 200) {
      alert("data has been delete successfully !");
    } else {
      throw "kuch message";
    }
  } catch (err) {
    alert("unable to delete the data !");
    console.log("unable to delete", err);
  }
};

export { deleteData };

//Delete Data

/*import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteData } from "./DeleteData.js";

const ReadData = (props) => {
  let [FetchedData, SetFetchedData] = useState(null);
  let [isEdit, setisEdit] = useState(false);
  let [propsdata, setpropsData] = useState();
  /*let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [deleteId, setDeleteId] = useState(null);*/

  /*let fetchDataFromDatabase = async () => {
    try {
      let result = await axios({
        method: "get",
        url: "http://localhost:5500/fetchData",
      });*/

      
          



