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

  createBuckets: async function (body) {
    
    let selectQuery = "SELECT * FROM buckets";
    const [rows] = await pool.query(selectQuery);
    return { status: true, message: "Got buckets successfully", data: rows, status_code: 200 }
  },

}

export default bucketsService;