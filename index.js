import express from "express";
import bodyParser from "body-parser";
import mysql2 from "mysql2";
import ejs from "ejs";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));
//-------------------------------------------------------------------------------------
//mysql connection
//------------------------------------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------------------------------
// get 
//-----------------------------------------------------------------------------------------------------------------

app.get("/Login", async (req, res) => {
  res.render("Login.ejs");
});
app.get("/Dashboard", async (req, res) => {
  try {
    const fetchData = `
      SELECT
        (SELECT COUNT(*) FROM Student_Details) AS studentCount,
        (SELECT COUNT(*) FROM admin) AS adminCount,
        (SELECT COUNT(*) FROM Employee) AS employeeCount,
        (SELECT COUNT(*) FROM visitor) AS visitorCount,
        (SELECT COUNT(*) FROM Hostel) AS hostelCount
    `;

    const data = await new Promise((resolve, reject) => {
      db.query(fetchData, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Assuming the counts are in the first row of the result
        }
      });
    });

    console.log(data);

    res.render("Dashboard.ejs", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/register", (req, res) => {
  res.render("Registration.ejs");
});
app.get("/StudentDetails", async (req, res) => {
  try {
    // Fetch data from the Appointment table
    const fetchStudentDetail = "SELECT Student_Details.* FROM Student_Details ";

    const Student = await new Promise((resolve, reject) => {
      db.query(fetchStudentDetail, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    // console.log(Doctors)
    // Render the Appointment.ejs view and pass the data to it
    res.render("Hostel_Student.ejs", { Student });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/VisitorLog", async (req, res) => {
  try {
    // Fetch data from the Appointment table
    const fetchAppointmentsQuery = "SELECT * FROM visitor";
    const appointments = await new Promise((resolve, reject) => {
      db.query(fetchAppointmentsQuery, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Render the Appointment.ejs view and pass the data to it
    res.render("visitor.ejs", { appointments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/work", async (req, res) => {
  try {
    // Fetch data from the Appointment table
    const fetchWorkQuery = "SELECT * FROM employee";
    const Emp = await new Promise((resolve, reject) => {
      db.query(fetchWorkQuery, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Render the Appointment.ejs view and pass the data to it
    res.render("Employee.ejs", { Emp });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/Employee_details", (req, res) => {
  res.render("Employee_details.ejs");
});
app.get("/user", (req, res) => {
  res.render("user.ejs");
});
app.get("/app", (req, res) => {
  res.render("Application.ejs");
});
app.get("/Oapp", (req, res) => {
  res.render("otherApplication.ejs");
});


//---------------------------------------------------------------------------------------------------------------
// post request
//-----------------------------------------------------------------------------------------------------------------
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
      // res.status(200).send("Data inserted into database");
      // res.redirect('/http://127.0.0.1:5500/Pages/visitor.html');
      res.redirect("/");
    }
  );
});
app.post("/submitform2", (req, res) => {
  const {
    "Hostel ID": HostelID,
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
    "INSERT INTO Student_Details(Hostel_Id, Reg_Number, Full_Name, Email, Contact, Gender, Course, Alt_Contact, Guardian_Name, Guardian_Relation, Guardian_Contact, Current_Address, Permanent_Address, Room_No, Starting_Date, Seater, Duration, Food_Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
        console.error("Error inserting data into database:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Data inserted into database");
      res.status(200).send("Data inserted into database");
      // Uncomment the line below if you want to redirect
      // res.redirect('/Pages/visitor.html');
      res.redirect("/");
    }
  );
});
app.post("/submitUserForm", (req, res) => {
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
    "INSERT INTO Employee(Employee_Id, Employee_Name, Job_Type, Salary, Employee_Contact, Working_from, Hos_Id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql3,
    [
      Employee_Id,
      Employee_Name,
      Job_Type,
      Salary,
      Employee_Contact,
      Working_from,
      Hos_Id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Data inserted into database");
      // res.status(200).send('Data inserted into database');
      // res.redirect("/Dashboard")
    }
  );
});

app.post("/SignIn", async (req, res) => {
  console.log(req.body);

  try {
    const fetchData = `SELECT * FROM login_details where Email_Id = '${req.body.email}' AND Password = '${req.body.password}'`;

    const data = await new Promise((resolve, reject) => {
      db.query(fetchData, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    console.log("Data:", data);

    if (data) {
      if (
        req.body.email === "Satyamsajal6@gmail.com" &&
        req.body.password === "admin123"
      ) {
        console.log("I am in admin");
        res.redirect("/Dashboard");
      } else {
        console.log("I am in user");
        res.render("user.ejs");
      }
    } else {
      console.log("Wrong credentials");
      res.redirect("/Login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signUp", (req, res) => {
  let dataArray2 = [req.body.name, req.body.Email, req.body.password];

  const sql2 =
    " Insert into login_details(userName, Email_Id, Password) values(?,?,?)";
  db.query(sql2, dataArray2, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted into database");
      console.log("user registered Now Login Using Your Credentials");
      res.redirect("/Login");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
