const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer"); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret ='Fullstack-login'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('upload'));

const corsOptions = {
  origin: "http://127.0.0.1:3000",
  credentials: true,
};

app.use(cors(corsOptions));

const dbCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopbest",
});
dbCon.connect();

app.get("/", (req, res) => {
  dbCon.query("SELECT * FROM product", (error, results, fields) => {
    if (error) throw error;
    let message = "";
    if (results === undefined || results.length == 0) {
      message = "Data product is Empty";
    } else {
      message = "Successfully retrieved all product";
    }
    return res.send({ error: false, data: results, message: message });
  });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  dbCon.query(`SELECT * FROM product WHERE id = ${id}`, (error, results) => {
    if (error) throw error;
    let message = "";
    if (results === undefined || results.length == 0) {
      message = "Data product is Empty";
    } else {
      message = "Successfully retrieved single product";
    }
    return res.send({ error: false, data: results, message: message });
  });
});

app.post("/product/add", (req, res) => {
  const nameproduct = req.body.nameproduct;
  const price = req.body.price;
  const amout = req.body.amout;
  const detail = req.body.detail;
  const img = req.body.img;



  if (!nameproduct || !price || !amout || !detail || !img) {
    return res.send({ message: "Please provide all the required data" });
  } else {
    dbCon.query(
      "INSERT INTO product (name_product, price_product, amout_product, detail_product, img_produt) VALUES(?, ?, ?, ?, ?)",
      [nameproduct, price, amout, detail, img],
      (error, results, fields) => {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Product successfully added",
        });
      }
    );
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload"); //ไฟล์รูปอยู่นี้เข้าใจมั่ย
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // ตั้งชื่อรูป
    
  },
});

const upload = multer({ storage: storage });

app.post("/product/add-image", upload.single("img_produt"), (req, res) => {
  const test = req.file.filename;
  const nameproduct = req.body.nameproduct;
  const price = req.body.price;
  const amout = req.body.amout;
  const detail = req.body.detail;

  console.log(test);

  if (!nameproduct || !price || !amout || !detail || !test) {
    return res.send({ message: "Please provide all the required data" });
  } else {
    dbCon.query(
      "INSERT INTO product (name_product, price_product, amout_product, detail_product, img_produt) VALUES(?, ?, ?, ?, ?)",
      [nameproduct, price, amout, detail, test],
      (error, results, fields) => {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Product successfully added",
        });
      }
    );
  }
});

app.delete("/product/delete/:id", (req, res) => {
  const id = req.params.id;
  dbCon.query(`DELETE FROM product WHERE id = ${id}`, (error, results) => {
    if (error) throw error;
    return res.send({ error: false, message: "Product deleted successfully" });
  });
});


app.put("/product/update/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const nameproduct = req.body.name_product;
  const price = req.body.price_product;
  const amout = req.body.amount_product;
  const detail = req.body.detail_product;
   
  if (!nameproduct || !price || !amout || !detail  ) {
    return res.send({ message: "Please provide all the required data" });
  } else {
    dbCon.query(
      "UPDATE product SET name_product = ?, price_product = ?, amout_product = ?, detail_product = ? WHERE id = ?",
      [nameproduct, price, amout, detail, id],
      (error, results, fields) => {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Product successfully updated",
        });
      }
    );
  }
});




app.get("/register/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  dbCon.query(`SELECT * FROM login WHERE id = ${id}`, (error, results) => {
    if (error) throw error;
    let message = "";
    if (results === undefined || results.length == 0) {
      message = "Data product is Empty";
    } else {
      message = "Successfully retrieved single product";
    }
    return res.send({ error: false, data: results, message: message });
  });
});

app.post("/register/add", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send({ message: "Please provide both username and password" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      dbCon.query(
        "INSERT INTO login (username, password) VALUES (?, ?)",
        [username, hash],
        (error, results, fields) => {
          if (error) throw error;
          return res.send({
            error: false,
            data: results,
            message: "Register successfully added",
          });
        }
      );
    });
  }
});



app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  dbCon.query(`SELECT * FROM login WHERE username = ?`, [username], (error, results, fields) => {
      if (error) {
        console.log(error); // ตรวจสอบข้อผิดพลาดที่เกิดขึ้นในการติดต่อฐานข้อมูล
        return res.send({
          error: true,
          message: "Database error",
        });
      }

      if (results.length === 0) {
        return res.send({
          error: true,
          message: "Username not found",
        });
      }

      const hashedPassword = results[0].password;
      bcrypt.compare(password, hashedPassword, function(err, isMatch) {
        if (err) {
          console.error("Password comparison error: ", err);
           // ตรวจสอบข้อผิดพลาดในการเปรียบเทียบรหัสผ่าน
          return res.send({
            error: true,
            message: "Password comparison error",
          });
        }

        if (isMatch) {
          const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
          return res.send({
            error: false,
            token,
            message: "Login successful",
          });
        } else {
          return res.send({
            error: true,
            message: "Incorrect password",
          });
        }
      });
    }
  );
  
});

app.post('/authen', (req, res) => {
  try{
    const token = req.body.headers.Authorization.split(' ')[1];
    const test = token.split('"')[1]
    var decoded = jwt.verify(test, secret);
    res.json({ status:'ok'})
  } catch(err){
    res.json({ status:'error',message:err.message })
  }
 
});










app.listen(4000, () => {
  console.log("Node App is running on port 4000");
});
