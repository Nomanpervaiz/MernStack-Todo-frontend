import axios from "axios";
import { AppRoutes } from "../constant/AppRoutes";

export async function updateTaskData(id, status) {
  try {
    const updateResponse = await axios.put(AppRoutes.task, {
      id,
      status,
    });
    return updateResponse.data;
  } catch (error) {
    console.log("error in getting data==> ", error);
  }
}


