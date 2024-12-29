import axios from "axios";

export async function updateTaskData(id, status) {
  try {
    const updateResponse = await axios.put("http://localhost:4000/task", {
      id,
      status,
    });
    return updateResponse.data;
  } catch (error) {
    console.log("error in getting data==> ", error);
  }
}


