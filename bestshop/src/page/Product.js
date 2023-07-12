import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./product.css";
import Swal from 'sweetalert2';

function Product() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  

  const addToCart = () => {
    const item = {
      product: selectedProduct,
      quantity: quantity
    };
  
    // เก็บข้อมูลลงใน localStorage
    const cartItemsFromStorage = JSON.parse(localStorage.getItem("product")) || [];
    const updatedCartItems = [...cartItemsFromStorage, item];
    localStorage.setItem("product", JSON.stringify(updatedCartItems));
  
    Swal.fire({
      icon: 'success',
      title: 'Product added to cart',
      showConfirmButton: false,
      timer: 1500 // 1.5 วินาที
    });
  
    // อัปเดตค่า cartItems ใน localStorage
    const cartItemsStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItemsStorage = [...cartItemsStorage, item];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItemsStorage));
  
    toggleModal();
  };
  
  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    toggleModal();
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const renderProducts = () => {
    return data.map((product) => (
      <div
        className="Product"
        key={product.id}
        onClick={() => handleProductClick(product)}
      >
        <img
          src={`http://localhost:4000/uploads/${product.img_produt}`}
          alt="Product Image"
        />
        <div className="product-grid">
          <h3>{product.name_product}</h3>
          <p>{product.price_product}</p>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderProducts()}
      {modal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={toggleModal}>
              &times;
            </span>
            <div className="modal-body">
              <img src={`http://localhost:4000/uploads/${selectedProduct.img_produt}`}/>
              <h2>รายละเอียดสินค้า</h2>

              <p>{selectedProduct.detail_product}</p>
              <p>จำนวน: {selectedProduct.amout_product}</p>
              <p>ราคา: {selectedProduct.price_product}</p>
              <div className="quantity-container">
                <button className="quantity-button" onClick={decrementQuantity}>
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button className="quantity-button" onClick={incrementQuantity}>
                  +
                </button>
              </div>
              <button className="add-to-cart" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
            <div className="modal-actions">
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
