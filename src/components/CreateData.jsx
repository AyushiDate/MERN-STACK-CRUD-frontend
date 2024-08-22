import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateData = (props) => {
  let [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    age: "",
    address: "",
    pincode: "",
    dob: "",
  });

  let [status, setStatus] = useState(false);
  let [message, setMessage] = useState("");
  let [messageColor, setMessageColor] = useState("");

  // Function to fetch data (if needed)
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5500/fetchData"); // Adjust URL as needed
      setFormData(response.data); // Assuming response.data contains form fields
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // Fetch data on component mount (if needed)
  useEffect(() => {
    fetchData();
  }, []);

  let handelChange = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    setFormData((prev) => {
      return { ...prev, age: age };
    });
  };

  let handelSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      let result = await axios({
        method: "post",
        url: "http://localhost:5500/acceptform",
        data: formData,
      });

      console.log("Your data has been sent to the backend for validation!");

      if (result.status === 202) {
        resetForm();
        setStatus(true);
        closePopUp();
        setMessage(result.data.message);
        setMessageColor("success");
        props.call();
        fetchData(); // Refresh form data after successful submission
      } else {
        resetForm();
        setStatus(true);
        closePopUp();
        setMessage(result.data.message);
        setMessageColor("danger");
        props.call();
        fetchData(); // Refresh form data even if submission fails
      }
    } catch (err) {
      console.log("Unable to send data", err);
    }
  };

  let resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      age: "",
      address: "",
      pincode: "",
      dob: "",
    });
  };

  let closePopUp = () => {
    setTimeout(() => {
      setStatus(false);
    }, 5000);
  };

  return (
    <>
      <div>
        <div className="container shadow-lg my-5 p-5">
          <h1 className="py-2">Data Entry Form</h1>

          <form onSubmit={handelSubmit}>
            <div className="d-flex flex-column gap-3">
              <div className="row">
                <div className="col">
                
                  <input
                    required
                    onChange={handelChange}
                    className="form-control"
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    value={formData.name}
                  />
                </div>
                <div className="col">
                  <input
                    required
                    onChange={(e) => {
                      handelChange(e);
                    }}
                    className="form-control"
                    placeholder="Enter Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                  />
                </div>
                <div className="col">
                  <input
                    required
                    onChange={handelChange}
                    className="form-control"
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    value={formData.email}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <input
                    required
                    onChange={handelChange}
                    className="form-control"
                    placeholder="Enter City"
                    type="text"
                    name="city"
                    value={formData.city}
                  />
                </div>
                <div className="col-8">
                  <input
                    required
                    onChange={handelChange}
                    className="form-control"
                    placeholder="Enter Address"
                    type="text"
                    name="address"
                    value={formData.address}
                  />
                </div>
                <div className="col">
                  <input
                    required
                    onChange={handelChange}
                    className="form-control"
                    type="number"
                    placeholder="Enter Pincode"
                    name="pincode"
                    value={formData.pincode}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="row align-items-center">
                    <div className="col">
                      <label htmlFor="dob">Enter D.O.B.</label>
                    </div>
                    <div className="col-9">
                      <input
                        required
                        onChange={(e) => {
                          handelChange(e);
                          calculateAge(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Enter DOB"
                        type="date"
                        name="dob"
                        value={formData.dob}
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <input
                    required
                    onChange={handelChange}
                    className="form-control"
                    placeholder="Enter Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    readOnly
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-success" id="submitBtn">
                  Submit
                </button>
                <button type="reset" onClick={resetForm} className="btn btn-danger">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {status ? (
        <div className="mt-3 p-2 w-50 position-absolute start-50 top-0 z-3 translate-middle-x bg-light text-center text-dark shadow-lg">
          <h4 className={`text-${messageColor}`}>{message}</h4>
        </div>
      ) : null}
    </>
  );
};

export default CreateData;

