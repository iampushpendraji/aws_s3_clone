import pool from "../db/connection.mjs";

const bucketsService = {

  /*
 
    @ Pushpendra
    Method Name - {getBuckets}
    Desc - Created method for getting buckets list
    Date - 28/10/23
 
  */

  getBuckets: async function () {
    let selectQuery = "SELECT * FROM buckets";
    const [rows] = await pool.query(selectQuery);
    return { status: true, message: "Got buckets successfully", data: rows, status_code: 200 }
  },

  /*
 
    @ Pushpendra
    Method Name - {createBuckets}
    Desc - Created method for creating new buckets
    Date - 28/10/23
 
  */

  createBucket: async function (body) {
    let bucket_name = body.bucket_name;
    let insertQuery = `INSERT INTO buckets SET ?`;
    let obj = { bucket_name: bucket_name, created_on: +new Date(), modified_on: +new Date() }
    const [rows] = await pool.query(insertQuery, obj);
    return { status: true, message: "Object Inserted successfully", data: [], status_code: 200 };
  },

  /*
   
    @ Pushpendra
    Method Name - {deleteBuckets}
    Desc - Created method for deleting buckets
    Date - 28/10/23
   
  */

  deleteBucket: async function (body) {
    let { bucket_id } = body, selectQuery = "SELECT * FROM objects WHERE bucket_id = ?";
    const [objects] = await pool.query(selectQuery, [bucket_id]);
    if (objects.length > 0) {  // If bucket is not empty then we will not delete it
      return { status: false, message: "Bucket is not empty", data: [], status_code: 200 };
    }
    let deleteQuery = "DELETE FROM buckets WHERE bucket_id = ?";
    const [rows] = await pool.query(deleteQuery, [bucket_id]);
    return { status: true, message: "Deleted object successfully", data: [], status_code: 200 };
  },

  /*
 
    @ Pushpendra
    Method Name - {deleteObjects}
    Desc - Created method for deleting objects from bucket
    Date - 28/10/23
 
  */

  emptyBucekt: async function (body) {
    let { bucket_id } = body;
    let selectQuery = "DELETE FROM objects WHERE bucket_id = ?";
    const [rows] = await pool.query(selectQuery, [bucket_id]);
    return { status: true, message: "Deleted all objects from bucket successfully", data: [], status_code: 200 };
  },

}

export default bucketsService;