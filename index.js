import express from "express";
import bodyParser from "body-parser";
import mysql2 from "mysql2";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

//mysql connection
const db = mysql2.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "Admin123@",
  database: "HMS",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to HMS");
});

app.set("view engine", "ejs");

app.get("./", async (req, res) => {
  const names = "Select * From visitor";

  db.query(names, async (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
  });
});

app.post("/submit", (req, res) => {
  const {
    visitorName,
    "Hostel ID": residentID,
    contactNumber,
    purposeOfVisit,
    checkInTime,
    checkOutTime,
    foodStatus,
  } = req.body;
  console.log(req.body);

  const sql =
    "INSERT INTO Visitor(Visitor_Name, Resident_ID, Contact_number, Purpose_of_Visit, Check_In, Check_Out, Food_Status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      visitorName,
      residentID,
      contactNumber,
      purposeOfVisit,
      checkInTime,
      checkOutTime,
      foodStatus,
    ],
    (err, result) => {
      if (err) throw err;
      console.log("Data inserted into database");
      res.status(200).send("Data inserted into database");
      // res.redirect('/http://127.0.0.1:5500/Pages/visitor.html');
    }
  );
});
app.post('/submitform2', (req, res) => {
    const {
      'Hostel ID': HostelID,
      registrationNumber,
      fullName,
      emailAddress,
      contactNumber,
      gender,
      selectedCourse,
      emergencyContactNumber,
      guardianName,
      guardianRelation,
      guardianContactNumber,
      currentAddress,
      permanentAddress,
      roomNumber,
      startingDate,
      seater,
      duration,
      foodStatus,
    } = req.body;
  
    console.log(req.body);
  
    const sql2 =
      'INSERT INTO Student_Details(Hostel_Id, Reg_Number, Full_Name, Email, Contact, Gender, Course, Alt_Contact, Guardian_Name, Guardian_Relation, Guardian_Contact, Current_Address, Permanent_Address, Room_No, Starting_Date, Seater, Duration, Food_Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
    db.query(
      sql2,
      [
        HostelID,
        registrationNumber,
        fullName,
        emailAddress,
        contactNumber,
        gender,
        selectedCourse,
        emergencyContactNumber,
        guardianName,
        guardianRelation,
        guardianContactNumber,
        currentAddress,
        permanentAddress,
        roomNumber,
        startingDate,
        seater,
        duration,
        foodStatus,
      ],
      (err, result) => {
        if (err) {
          console.error('Error inserting data into database:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        console.log('Data inserted into database');
        res.status(200).send('Data inserted into database');
        // Uncomment the line below if you want to redirect
        // res.redirect('/Pages/visitor.html');
      }
    );
  });
  app.post('/submitUserForm', (req, res) => {
    const {
      Employee_Id,
      Employee_Name,
      Job_Type,
      Salary,
      Employee_Contact,
      Working_from,
      Hos_Id,
    } = req.body;
  
    const sql3 =
      'INSERT INTO Employee(Employee_Id, Employee_Name, Job_Type, Salary, Employee_Contact, Working_from, Hos_Id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    db.query(
      sql3,
      [Employee_Id, Employee_Name, Job_Type, Salary, Employee_Contact, Working_from, Hos_Id],
      (err, result) => {
        if (err) {
          console.error('Error inserting data into database:', err);
          return res.status(500).send('Internal Server Error');
        }
  
        console.log('Data inserted into database');
        res.status(200).send('Data inserted into database');
      }
    );
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
