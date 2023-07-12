import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Adminproduct.css";
import Swal from 'sweetalert2';


function Adminproduct() {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [modal, setModal] = useState(false);

  const toggleModal = (id) => {
    setModal((prevModal) => {
      if (prevModal === id) {
        setUpdatedData({});
        return null;
      }
      setUpdatedData((prevData) => ({
        ...prevData,
        ...data.find((product) => product.id === id),
      }));
      return id;
    });
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [modal]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  };

  const deleteData = (productId) => {
    Swal.fire({
      target: document.getElementById('root'), // ตัวอย่างเป็นตัวอย่าง ID ของ root element
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบสินค้านี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบสินค้า',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/product/delete/${productId}`)
          .then((res) => {
            console.log('Product deleted successfully');
            fetchData();
            setModal(false);
            Swal.fire({
              target: document.getElementById('root'), // ตัวอย่างเป็นตัวอย่าง ID ของ root element
              title: 'ลบสินค้าเรียบร้อย',
              icon: 'success'
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const updateData = (productId) => {
    axios
      .put(`http://localhost:4000/product/update/${productId}`, updatedData)
      .then((res) => {
        console.log(res);
        fetchData(); // Fetch updated data after update
        setUpdatedData({});
        setModal(false); // Close the modal
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderEditForm = (product) => {
    return (
     
        <div className="editproduct" id="popup">
          <h3>แก้ไขสินค้า</h3>
          <input
            type="text"
            name="name_product"
            value={updatedData.name_product || ""}
            onChange={handleInputChange}
            placeholder="ชื่อสินค้า"
          />
          <input
            type="text"
            name="detail_product"
            value={updatedData.detail_product || ""}
            onChange={handleInputChange}
            placeholder="รายละเอียดสินค้า"
          />
          <input
            type="text"
            name="price_product"
            value={updatedData.price_product || "฿"}
            onChange={handleInputChange}
            placeholder="ราคา"
          />
          <input
            type="text"
            name="amount_product"
            value={updatedData.amount_product || ""}
            onChange={handleInputChange}
            placeholder="จำนวน"
          />
          <button className="Delete" onClick={() => deleteData(product.id)}>
            Delete
          </button>
          <button className="Edit" onClick={() => updateData(product.id)}>
            Edit
          </button>
          <button className="close-modal" onClick={() => toggleModal(product.id)}>
            CLOSE
          </button>
        </div>
      )}
  
  

  const renderProducts = () => {
    
    return (
      
      <div className="all-table">
        
        <table className="table-display">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Name</th>
              <th>Detail</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={`http://localhost:4000/uploads/${product.img_produt}`}
                    alt="Product Image"
                  />
                </td>
                <td>{product.name_product}</td>
                <td>{product.detail_product}</td>
                <td>{product.price_product}</td>
                <td>{product.amout_product}</td>
                <td>
                  <button onClick={() => toggleModal(product.id)}>Edit</button>
                  <button onClick={() => deleteData(product.id)}>Delete</button>
                </td>
                {modal === product.id && renderEditForm(product)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{renderProducts()}</div>;
}

export default Adminproduct;
