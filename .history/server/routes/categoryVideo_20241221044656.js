import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { uptData } from "../helper/uptData";
import { CategoryVideo } from "../models/CategoryVideo";
import { response } from "../utils/response";

export async function handlerCategoryGET(req, res, col) {
  try {
    const data = await getAllData(col);

    res.status(200).json(response(data));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerCategoryGETID(req, res, col) {
  try {
    const { id } = req.query;

    const data = await getDataID(col, id);

    res.status(200).json(response(data));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerCategoryPOST(req, res, col) {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(404).json("Your fields are empty!");
      return;
    }

    const CategoryVideo = new CategoryVideo(name).toPlainObject();

    const data = await addData(col, CategoryVideo);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerCategoryPUT(req, res, col) {
  try {
    const { id } = req.query;

    const { name } = req.body;

    if (!name) {
      res
        .status(404)
        .json(
          "Please check your fieldnames and also price must be only number!"
        );
      return;
    }

    const CategoryVideo = new CategoryVideo(name).toPlainObject();

    const data = await uptData(col, id, CategoryVideo);
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerCategoryDELETE(req, res, col) {
  try {
    const { id } = req.query;

    await deleteData(col, id);

    res.status(204).json({ message: "Success", id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
