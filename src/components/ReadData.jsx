import axios from "axios";
import React, { useEffect, useState } from "react";
import  {deleteData}  from "./DeleteData.js";

const ReadData = (props) => {
  let [FetchedData, SetFetchedData] = useState(null);

  let [isEdit, setisEdit] = useState(false);

  let [propsdata, setpropsData] = useState();

  //let [updateData, setUpdateData] = useState();

  let fetchDataFromDatabase = async () => {
    try {
      let result = await axios({
        method: "get",
        url: "http://localhost:5500/fetchData",
      });

      console.log(result.data.database);

      SetFetchedData(result.data.database);
    } catch (err) {
      console.log("Unable to fetch data from database");
    }
  };

  /*let callFetchDataFunction = () => {

   alert("im from read data !")

      if (props.isload) {
          fetchDataFromDatabase();
      }
   }

  useEffect(() => {
       callFetchDataFunction();
   }, [props.isload])*/

  useEffect(() => {
    fetchDataFromDatabase();
  }, [props.isload]);

  let DisplayDataRow = (props) => {
    //let rawData = props;

    return (
      <tr className="" key={props._id}>
        <td>{props.name}</td>
        <td>{props.phone}</td>
        <td>{props.email}</td>
        <td>{props.city}</td>
        <td>{props.pincode}</td>
        <td>{props.address}</td>
        <td>{props.dob}</td>
        <td>{props.age}</td>
        <td>
          <button
            className="btn btn-danger me-2"
            onClick={() => {
              deleteData(props.name, props._id);
              // callFetchDataFunction()
            }}
          >
            Delete
          </button>
          {/*<button
            className="btn btn-primary"
            onClick={() => {
              SetOpenEdit(true);
              setEditData(rawData);
              setUpdateData(editData);
            }}
          >
            Edit
          </button>*/}

          <button
            className="btn btn-primary"
            onClick={() => {
              setisEdit(true);
              setpropsData(props);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  };

  let handleChange = (e) => {
    let { name, value } = e.target;

    setpropsData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSave = async () => {
    await axios({
      method: "PUT",
      url: "http://localhost:5500/updateData",
      data: propsdata,
    });
    console.log(propsdata);
    setisEdit(false);
  };

  return (
    <>
      <div
        style={{ maxHeight: "300px", maxWidth: "1200px" }}
        className="container  overflow-scroll "
      >
        {FetchedData ? (
          <table
            style={{ maxHeight: "200px" }}
            className="table table-border  "
          >
            <thead className="">
              <tr className="table-dark">
                <th>name</th>
                <th>phone</th>
                <th>email</th>
                <th>city</th>
                <th>pincode</th>
                <th>address</th>
                <th>dob</th>
                <th>age</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>{FetchedData.map(DisplayDataRow)}</tbody>
          </table>
        ) : (
          <h1>Unable to get data !</h1>
        )}
      </div>

      {isEdit ? (
        <div className="m-2 bg-dark p-2 w-50 position-absolute start-50 top-50 z-3 translate-middle-x bg-light text-center  text-dark  shadow-lg">
          <h2 className="text-center text-light">Edit Form</h2>
          <div className="p-3 gap-2 m-2">
            <div className="row gap-2">
              <div className="col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Name"
                  type="text"
                  name="name"
                  value={propsdata.name}
                />
              </div>
              <div className="col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Phone"
                  type="tel"
                  name="phone"
                  value={propsdata.phone}
                />
              </div>
              <div className=" col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter E-mail"
                  type="email"
                  name="email"
                  value={propsdata.email}
                />
              </div>

              <div className="  col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter City"
                  type="text"
                  name="city"
                  value={propsdata.city}
                />
              </div>
              <div className="  col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Address"
                  type="text"
                  name="address"
                  value={propsdata.address}
                />
              </div>
              <div className=" col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter pincode"
                  type="number"
                  name="pincode"
                  value={propsdata.pincode}
                />
              </div>

              <div className="col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control"
                  type="date"
                  name="dob"
                  value={propsdata.dob}
                />
              </div>
              <div className="col-12">
                <input
                  required
                  onChange={handleChange}
                  className="form-control "
                  id="birthDate"
                  placeholder="Enter Age"
                  type="number"
                  value={propsdata.age}
                  name="age"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center m-2 gap-3">
            <button className="btn btn-success" onClick={handleSave}>
              save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setisEdit(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ReadData;