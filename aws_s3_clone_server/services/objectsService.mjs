import pool from "../db/connection.mjs";
import multerUpload from "./uploadService.mjs";
import path from "path";


const objectsService = {

  /*
 
    @ Pushpendra
    Method Name - {getObjects}
    Desc - Created method for getting objects from bucket_id
    Date - 28/10/23
 
  */

  getObjects: async function (body) {
    let { bucket_id, relation_id } = body;
    let selectQuery = "SELECT * FROM objects WHERE bucket_id = ? and relation_id = ?";
    const [rows] = await pool.query(selectQuery, [bucket_id, relation_id]);
    return { status: true, message: "Got buckets successfully", data: rows, status_code: 200 };
  },

  /*
 
    @ Pushpendra
    Method Name - {getObjectById}
    Desc - Created method for getting objects from bucket_id
    Date - 28/10/23
 
  */

  getObjectById: async function (body) {
    let { bucket_id, object_id, relation_id } = body;
    let selectQuery = "SELECT object_name FROM objects WHERE (bucket_id, object_id, relation_id) IN ((?, ?, ?))";
    const [rows] = await pool.query(selectQuery, [bucket_id, object_id, relation_id]);
    const filePath = path.join(process.cwd(), 'uploads', rows[0]["object_name"]);
    return { status: true, status_code: 200, data: [], file_path: filePath };
  },

  /*
 
    @ Pushpendra
    Method Name - {insertObject}
    Desc - Created method for inserting objects
    Date - 28/10/23
 
  */

  insertObject: async function (req, res) {
    // Use the `upload.single` middleware for handling a single file upload
    let response1 = await this.uploadFileToDB(req, res);  // Getting file into db
    if (response1) {
      let object_name = req.file.object_name; // here we are getting file name
      let { bucket_id, relation_id } = JSON.parse(req.body.data);
      let insertQuery = `INSERT INTO objects SET ?`;
      let obj = { bucket_id: bucket_id, relation_id: relation_id ? relation_id : 0, object_name: object_name, is_folder: 0, file_name: req.file.originalname, created_on: +new Date(), modified_on: +new Date() };
      const [rows] = await pool.query(insertQuery, obj);
      return { status: true, message: "Object Inserted successfully", data: [], status_code: 200 };
    }
    else {
      return { status: false, message: "Error in upload object", data: [], status_code: 400 };
    }
  },

  /*
 
    @ Pushpendra
    Method Name - {insertFolder}
    Desc - Created method for inserting folder
    Date - 28/10/23
 
  */

  insertFolder: async function (body) {
    let { bucket_id, relation_id, folder_name } = body;
    let insertQuery = `INSERT INTO objects SET ?`;
    let obj = { object_name: folder_name, bucket_id: bucket_id, relation_id: relation_id, is_folder: 1, file_name: folder_name, created_on: +new Date(), modified_on: +new Date() }
    const [rows] = await pool.query(insertQuery, obj);
    return { status: true, message: "Folder Inserted successfully", data: [], status_code: 200 };
  },

  /*
 
    @ Pushpendra
    Method Name - {uploadFileToDB}
    Desc - Created method for uploading file to db
    Date - 28/10/23
 
  */

  uploadFileToDB(req, res) {
    return new Promise((response) => {
      multerUpload.single('file')(req, res, (err) => {
        if (err) {
          return response(false);
        }

        if (!req.file) {
          return response(false);
        }

        return response(true);
      });
    });
  },

  /*
 
    @ Pushpendra
    Method Name - {deleteObjects}
    Desc - Created method for deleting objects from bucket
    Date - 28/10/23
 
  */

  deleteObjects: async function (body) {
    let { bucket_id, object_ids, relation_id, isFolder } = body;
    if(isFolder) {  // If user is deleting folder
      let selectQuery = "SELECT * FROM objects WHERE bucket_id = ?";
      const [rows] = await pool.query(selectQuery, [bucket_id]);
      let allObjectsOfBucket = JSON.parse(JSON.stringify(rows));
    }
    else {  // If user is deleting file
      let deleteQuery = "DELETE FROM objects WHERE object_id IN (?) AND bucket_id = ? AND relation_id = ?";
      const [rows] = await pool.query(deleteQuery, [object_ids, bucket_id, relation_id]);
      return { status: true, message: "Deleted object successfully", data: [], status_code: 200 };
    }
  },


  /*
 
    @ Pushpendra
    Method Name - {getRelationById}
    Desc - Created method for getting objects from bucket_id
    Date - 28/10/23
 
  */

  getRelationById: async function (body) {
    let { bucket_id, object_id } = body;
    let selectQuery = "SELECT * FROM objects WHERE bucket_id = ? AND object_id = ?";
    const [rows] = await pool.query(selectQuery, [bucket_id, object_id]);
    return { status: true, message: "Relation Id got successfully", data: rows, status_code: 200 };
  },

}

export default objectsService;