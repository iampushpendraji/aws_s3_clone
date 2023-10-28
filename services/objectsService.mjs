import multer from "multer";
import pool from "../db/connection.mjs";

const objectsService = {

  /*
 
    @ Pushpendra
    Method Name - {getObjects}
    Desc - Created method for getting objects from bucket_id
    Date - 28/10/23
 
  */

  getObjects: async function (body) {
    let bucket_id = body.bucket_id;
    let selectQuery = "SELECT * FROM objects WHERE bucket_id = ?";
    const [rows] = await pool.query(selectQuery, [bucket_id]);
    return { status: true, message: "Got buckets successfully", data: rows, status_code: 200 };
  },

  /*
 
    @ Pushpendra
    Method Name - {insertObject}
    Desc - Created method for getting objects from bucket_id
    Date - 28/10/23
 
  */

  insertObject: async function (req) {


  },

  /*
 
    @ Pushpendra
    Method Name - {insertObject}
    Desc - Created method for getting objects from bucket_id
    Date - 28/10/23
 
  */

  insertFile(req, callback) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        return cb(null, './uploads');
      },
      filename: function (req, file, cb) {
        const fileUniquName = file.originalname;
        return cb(null, fileUniquName);
      }
    });

    const upload = multer({ storage });
    callback(false);
  }


}

export default objectsService;