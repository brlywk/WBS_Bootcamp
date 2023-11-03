const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("data/pictures.sqlite", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database opened successfully");
  }
});

function addPicture(name, path, callback) {
  if (!db) {
    callback({ success: false, message: "Database connection not available" });
    return;
  }

  const q = "INSERT INTO pictures (name, path) VALUES (?, ?)";

  db.run(q, [name, path], function (err) {
    if (err) {
      callback({ success: false, message: `Error inserting row: ${err}` });
      return;
    }

    callback({ success: true, message: `Picture inserted successfully with pic_id ${this.lastID}` });
  });
}

function addMultiplePictures(pictures, callback) {
  if (!db) {
    callback({ success: false, message: "Database connection not available" });
    return;
  }

  if (!pictures) {
    callback({ success: false, message: "No pictures to insert" });
    return;
  }

  const placeholders = pictures.map(() => "(?, ?)").join(", ");
  const flatPictures = pictures.map((p) => [p.name, p.path]).flat();
  const q = `INSERT INTO pictures (name, path) VALUES ${placeholders}`;

  db.run(q, flatPictures, function (err) {
    if (err) {
      callback({ success: false, message: `Error inserting pictures: ${err}` });
      return;
    }

    callback({ success: true, message: `Pictures inserted succesfully: ${this.changes}` });
  });
}

function getPictures(callback) {
  if (!db) {
    callback({ success: false, message: "Database connection not available" });
    return;
  }

  db.all("SELECT * FROM pictures", function (err, rows) {
    if (err) {
      callback({ success: false, message: `Error retreiving pictures: ${err}` });
      return;
    }

    const pictures = [];

    rows.forEach((row) => {
      pictures.push({
        id: row.pic_id,
        name: row.name,
        path: row.path,
      });
    });

    callback({ success: true, message: "Picures successfully retreived", pictures });
  });
}

function close(callback) {
  if (!db) {
    callback({ success: false, message: "Database connection not available" });
    return;
  }

  db.close((err) => {
    if (err) {
      callback({ success: false, message: `Error getting  connection: ${err}` });
      return;
    }

    callback({ success: true, message: "Connection closed successfully" });
  });
}

module.exports = {
  addPicture,
  addMultiplePictures,
  getPictures,
  close,
};
