import React, { useState } from "react";
import axios from "axios";
import "./Sale.css";
import Swal from "sweetalert2";

function Sale() {
  const [nameproduct, setnameproduct] = useState("");
  const [price, setprice] = useState("0");
  const [amout, setamout] = useState("0");
  const [detail, setdetail] = useState("");
  const [img, setimg] = useState(null);

  const addproduct = () => {
    const formData = new FormData();
    formData.append("nameproduct", nameproduct);
    formData.append("price", price);
    formData.append("amout", amout);
    formData.append("detail", detail);
    formData.append("img_produt", img);

    axios
      .post("http://localhost:4000/product/add-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        const responsemess = response.data.message;
        if (responsemess === "Please provide all the required data") {
          Swal.fire("Error", "Please provide all the required data", "error");
        } else {
          Swal.fire("Success", "Product successfully added", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setimg(file);
  };

  return (
    <div className="form">
      <div className="title">ลงสินค้าตรงนี้งับ</div>

      <div className="input-container ic2">
        <div className="setnameproduct">ชื่อสินค้า</div>
        <input
          id="nameproduct"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => setnameproduct(event.target.value)}
        />
        <div className="cut"></div>
        <label htmlFor="nameproduct" className="placeholder">

        </label>
      </div>

      <div className="input-container ">
        <div className="setnameproduct">ราคาสินค้า</div>
        <input
          id="price"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => setprice(event.target.value)}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="price" className="placeholder">

        </label>
      </div>

      <div className="input-container ">
        <div className="setnameproduct">จำนวนสินค้า</div>
        <input
          id="amout"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => setamout(event.target.value)}
        />
        <div className="cut"></div>
        <label htmlFor="amout" className="placeholder">

        </label>
      </div>

      <div className="input-container ">
        <div className="setnameproduct">รายละเอียดสินค้า</div>
        <input
          id="detail"
          className="input"
          type="text"
          placeholder=" "
          onChange={(event) => setdetail(event.target.value)}
        />
        <div className="cut"></div>
        <label htmlFor="detail" className="placeholder">

        </label>
      </div>

      <div className="imgfile"> 
        <input
          id="yourBtn "
          className="img-input"
          type="file"
          placeholder=" img"
          onChange={handleImageChange}
        />
        <div className="cut"></div>

      </div>

      {/* <input
        id="yourBtn "
        className="img-input"
        type="file"
        placeholder=" "
        onChange={handleImageChange}
      /> */}

      <button type="button" className="submit" onClick={addproduct}>
        submit
      </button>
    </div>
  );
}

export default Sale;
