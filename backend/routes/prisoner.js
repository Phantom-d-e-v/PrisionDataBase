const connectDB = require("../db");
const router = require("express").Router();
const { uuid } = require("uuidv4");
const db = connectDB();

router.get("/", (req, res) => {
  return res.status(200).send({ msg: "Succesful" });
});

router.get("/get-inmates", (req, res) => {
  db.query("SELECT * FROM Inmate", (err, inmates) => {
    if (err) {
      return res.status(500).send(err);
    }
    inmates = inmates.map((inmate) => Object.assign({}, inmate));
    return res.status(200).send(inmates);
  });
});

router.post("/add-visitor", (req, res) => {
  const visitID = "VIS" + uuid().split("-")[4];
  const { prisoner_id, name, address, phone, date, start_time, end_time } =
    req.body;

  db.query(
    "INSERT INTO Visits (visitID, inmateID, visitor_name, visitor_address, visitor_phone, visitor_date, visit_starttime, visit_endtime) VALUES (?,?,?,?,?,?,?,?)",
    [visitID, prisoner_id, name, address, phone, date, start_time, end_time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Visitor added`);
      }
    }
  );
});

router.post("/get-visitor", (req, res) => {
  const { visitID } = req.body;
  db.query(
    "SELECT * FROM Visits WHERE visitID = ?",
    [visitID],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      result = result.map((visitor) => Object.assign({}, visitor));
      return res.status(200).send(result);
    }
  );
});

router.post("/add-inmate", (req, res) => {
  const inmateID = "INM" + uuid().split("-")[4];
  const {
    cellID,
    jobID,
    name,
    age,
    gender,
    bloodgroup,
    sentence_start,
    release_date,
    case_detail,
    offenceIDs,
  } = req.body;
  db.query(
    `INSERT INTO Inmate (inmateID, cellID, jobID, name, age, gender, bloodgroup, sentence_start, release_date, case_detail) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      inmateID,
      cellID,
      jobID,
      name,
      age,
      gender,
      bloodgroup,
      sentence_start,
      release_date,
      case_detail,
    ],
    (err, result) => {
      if (err) {
        db.rollback(function () {
          throw error;
        });
        console.log(err);
        return res.status(400).send("Error");
      }
    }
  );

  offenceIDs.forEach((elem) => {
    db.query(
      `INSERT INTO Commits values(?, ?)`,
      [inmateID, elem],
      (err, result) => {
        if (err) {
          db.rollback(function () {
            throw error;
          });
          console.log(err);
          return res.status(400).send("Error");
        }
      }
    );
  });

  db.commit(function (err) {
    if (err) {
      return connection.rollback(function () {
        return res.status(400).send("Error");
      });
    }
    return res.status(200).send("Success");
  });
});

router.post("/update-inmate", (req, res) => {
  const { inmateID, release_date, cellID, jobID, age } = req.body;
  db.query(
    `UPDATE Inmate SET release_date = ?, cellID = ?, jobID = ?, age = ? WHERE inmateID = ?`,
    [release_date, cellID, jobID, age, inmateID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Inmate updated`);
      }
    }
  );
});

router.get("/get-inmate", (req, res) => {
  const { inmateID } = req.body;
  db.query(
    "SELECT * FROM Inmate WHERE inmateID = ?",
    [inmateID],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      result = result.map((inmate) => Object.assign({}, inmate));
      return res.status(200).send(result);
    }
  );
});

router.post("/delete-inmate", (req, res) => {
  const { inmateID } = req.body;
  db.query(
    `DELETE FROM Inmate WHERE inmateID = ?`,
    [inmateID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Inmate deleted`);
      }
    }
  );
});

router.post("/get-cell-inmates", (req, res) => {
  const { cellID } = req.body;
  db.query(`SELECT * FROM Inmate WHERE cellID = ?`, [cellID], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((inmateID) => Object.assign({}, inmateID));
      return res.status(200).send(result);
    }
  });
});

router.post("/get-inmates-from-or", (req, res) => {
  const { orID } = req.body;
  db.query(
    `SELECT * FROM Inmate where InmateID in (SELECT InmateID FROM Commits where offenceID = ?)`,
    [orID],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        result = result.map((inmateID) => Object.assign({}, inmateID));
        return res.status(200).send(result);
      }
    }
  );
});

router.post("/get-inmates-from-jobs", (req, res) => {
  const { jobID } = req.body;
  db.query(`SELECT * FROM Inmate WHERE jobID = ?`, [jobID], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((inmateID) => Object.assign({}, inmateID));
      return res.status(200).send(result);
    }
  });
});

router.get("/get-visits", (req, res) => {
  db.query(`SELECT * FROM Visits`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((visit) => Object.assign({}, visit));
      return res.status(200).send(result);
    }
  });
});

router.post("/get-visits-by-inmate", (req, res) => {
  const { inmateID } = req.body;
  db.query(
    `SELECT * FROM Visits where inmateID=?`,
    [inmateID],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        result = result.map((visit) => Object.assign({}, visit));
        return res.status(200).send(result);
      }
    }
  );
});

router.post("/get-visits-by-date", (req, res) => {
  const { visitor_date } = req.body;
  db.query(
    `SELECT * FROM Visits where visitor_date=?`,
    [visitor_date],
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        result = result.map((visit) => Object.assign({}, visit));
        return res.status(200).send(result);
      }
    }
  );
});

router.post("/add-offence-record", (req, res) => {
  const offenceID = uuid().split("-")[4];
  const { offence_description } = req.body;
  db.query(
    `INSERT INTO Offence_Record (offenceID, offence_description) VALUES (?,?)`,
    [offenceID, offence_description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Offence Record added`);
      }
    }
  );
});

router.get("/get-offence-record", (req, res) => {
  const { offenceID } = req.body;
  db.query(
    `SELECT * FROM Offence_Record WHERE offenceID = ?`,
    [offenceID],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        result = result.map((offence) => Object.assign({}, offence));
        return res.status(200).send(result);
      }
    }
  );
});

router.get("/get-offence-records", (req, res) => {
  db.query(`SELECT * FROM Offence_Record `, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((offence) => Object.assign({}, offence));
      return res.status(200).send(result);
    }
  });
});

router.post("/add-job", (req, res) => {
  const jobID = "DUT" + uuid().split("-")[4];
  const { jobDesc, jobPay, job_startime, job_endtime } = req.body;
  db.query(
    `INSERT INTO Jobs (jobID, jobDesc, jobPay, job_startime, job_endtime ) VALUES (?,?,?,?,?)`,
    [jobID, jobDesc, jobPay, job_startime, job_endtime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Job added`);
      }
    }
  );
});

router.get("/get-jobs", (req, res) => {
  db.query(`SELECT * FROM Jobs`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((job) => Object.assign({}, job));
      return res.status(200).send(result);
    }
  });
});

router.post("/update-job", (req, res) => {
  const { jobID, jobPay } = req.body;
  db.query(
    `UPDATE Jobs SET jobPay = ? WHERE jobID = ?`,
    [jobPay, jobID],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(`Job updated`);
      }
    }
  );
});

router.get("/get-cells", (req, res) => {
  db.query(`SELECT * FROM Cell`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((cell) => Object.assign({}, cell));
      return res.status(200).send(result);
    }
  });
});

router.post("/increment-count", (req, res) => {
  db.query(`UPDATE Prison SET inmateCount + 1`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

router.post("/decrement-count", (req, res) => {
  db.query(`UPDATE Prison SET inmateCount - 1`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

// a - b - c -d - e
router.post("/add-personnel", (req, res) => {
  const personnelID = "PER" + uuid().split("-")[4];
  const { prisonID, postID, name, age, gender, personnel_phone, bloodgroup } =
    req.body;
  db.query(
    `INSERT INTO Personnel (personnelID, prisonID, postID, name, age, gender, personnel_phone, bloodgroup) VALUES (?,?,?,?,?,?,?,?)`,
    [
      personnelID,
      prisonID,
      postID,
      name,
      age,
      gender,
      personnel_phone,
      bloodgroup,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Inmate added`);
      }
    }
  );
});

router.post("/update-personnel", (req, res) => {
  const { personnelID, postID } = req.body;
  db.query(
    `UPDATE Personnel SET postID = ? WHERE personnelID = ?`,
    [postID, personnelID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Inmate updated`);
      }
    }
  );
});

router.post("/delete-personnel", (req, res) => {
  const { personnelID } = req.body;
  db.query(
    `DELETE FROM Personnel WHERE personnelID = ?`,
    [personnelID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`personnel deleted`);
      }
    }
  );
});

router.post("/add-post", (req, res) => {
  const { postID, post_name, post_description } = req.body;
  db.query(
    `INSERT INTO Post (postID, post_name, post_description) VALUES (?,?,?)`,
    [postID, post_name, post_description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Post added`);
      }
    }
  );
});

router.get("/get-post", (req, res) => {
  const { postID } = req.body;
  db.query(`SELECT * FROM Post WHERE postID = ?`, [postID], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((post) => Object.assign({}, post));
      return res.status(200).send(result);
    }
  });
});

router.get("/get-posts", (req, res) => {
  db.query(`SELECT * FROM Post`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((post) => Object.assign({}, post));
      return res.status(200).send(result);
    }
  });
});

router.get("/get-personnels", (req, res) => {
  db.query(`SELECT * FROM Personnel`, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      result = result.map((personnel) => Object.assign({}, personnel));
      return res.status(200).send(result);
    }
  });
});

router.post("/login", (req, res) => {
  const { Username, Password } = req.body;
  db.query(
    `SELECT * FROM Administrator WHERE Username = ?`,
    [Username],
    (err, results) => {
      if (err) {
        res.send({ message: "Error logging in" });
      } else {
        if (results[0].Password === Password) {
          res.status(200).send(results);
        } else {
          res.status(400).end("Invalid Password");
        }
      }
    }
  );
});

module.exports = router;
