import { Router } from "express";
import bucketsService from "../services/bucketsService.mjs";
import objectsService from "../services/objectsService.mjs";

const router = Router();

/*

    @ Pushpendra
    API Path - "/"
    Method Type - GET
    Desc - for path "/" we will send home page
    Params - {}
    Date - 28/10/23

*/

router.get("/", (req, res) => {
  return res.render("home");
});

/*

    @ Pushpendra
    API Path - "/get-buckets"
    Method Type - GET
    Desc - Created api for getting buckets list
    Params - {}
    Date - 28/10/23

*/

router.get("/get-buckets", async (req, res) => {
  try {
    const response = await bucketsService.getBuckets();
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/get-buckets} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/create-buckets"
    Method Type - POST
    Desc - Created api for creating buckets
    Params - {}
    Date - 28/10/23

*/

router.post("/create-buckets", async (req, res) => {
  try {
    const body = req.body, response = await bucketsService.createBuckets(body);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/create-buckets} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/get-objects"
    Method Type - GET
    Desc - Created api for getting objects based on bucket_id
    Params - {
        bucket_id: number
    }
    Date - 28/10/23

*/

router.get("/get-objects", async (req, res) => {
  try {
    const { query } = req,
      response = await objectsService.getObjects(query);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/get-objects} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

/*

    @ Pushpendra
    API Path - "/insert-object"
    Method Type - POST
    Desc - Created api inserting objects in bucket based on bucket_id
    Params - {
        bucket_id: number,
        object: file,
        type: "folder" | "file"
    }
    Date - 28/10/23

*/

router.post("/insert-object", async (req, res) => {
  try {
    const { query } = req,
      response = await objectsService.insertObject(req);
    return res.status(response.status_code).send(response);
  } catch (err) {
    console.log("Error in {/insert-object} in {routes.mjs}, ERROR ----->>>>> \n \n", err);
    return res.status(400).json({ status: false, message: "Error in process", status_code: 400, data: [] });
  }
});

export default router;