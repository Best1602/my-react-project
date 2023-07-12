  import React, { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import Swal from 'sweetalert2';
  import axios from "axios";

  function Summary() {
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };
    const navigate = useNavigate();
    const [cartItemsFromStorage, setCartItemsFromStorage] = useState([]);

    useEffect(() => {
      let Token = sessionStorage.getItem('Token');
      console.log(Token);
      axios.post('http://localhost:4000/authen', {
        headers: {
          'Authorization': `token ${Token}`
        }
      })
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === 'ok') {
            console.log("OK");
          } else {
            sessionStorage.removeItem('Token');
            window.location = '/';
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  


    const handleCheckout = () => {
      // สามารถเพิ่มโค้ดสำหรับการชำระเงินได้ตรงนี้
      // เช่น เรียก API หรือดำเนินการอื่น ๆ
      
      // แสดง Swal ว่าชำระเงินสำเร็จ
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        showConfirmButton: false,
        timer: 1500 // 1.5 วินาที
      });
    
      // กลับไปหน้า Home
      navigate('/');
    };

    const handleRemoveItem = (index) => {
      Swal.fire({
        title: 'ต้องการลบสินค้าใช่มั่ย',
        text: "ต้องการยกเลิกจริงๆหรอ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ลบ'
      }).then((result) => {
        if (result.isConfirmed) {
          // ลบสินค้าออกจากตะกร้าโดยใช้ index ที่กำหนด
          const updatedCartItems = cartItemsFromStorage.filter((item, i) => i !== index);
          setCartItemsFromStorage(updatedCartItems);
    
          // อัปเดตค่า cartItems ใน localStorage
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    
          Swal.fire(
            'ลบสินค้าออกจากตระกร้าแล้ว!',
            'สามารถดูสินค้าอื่นๆได้ในหน้า Product',
            'success'
          );
        }
      });
    };

    useEffect(() => {
      // Load cart items from localStorage
      const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItemsFromStorage(cartItemsFromStorage);
    }, []);

    return (
      <div>
        <h2>ตระกร้าสินค้า</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItemsFromStorage.map((item, index) => (
              <tr key={index}>
                <td>{item.product.name_product}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price_product}</td>
                <td>
                  <img
                    src={`http://localhost:4000/uploads/${item.product.img_produt}`}
                    alt="Product Image"
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleCheckout}>Checkout</button>
      </div>
    );
  }

  export default Summary;
