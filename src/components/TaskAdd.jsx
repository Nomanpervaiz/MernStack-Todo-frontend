import { useContext, useEffect, useState } from "react";
import TaskAddForm from "./TaskAddForm";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Edit, Trash } from "lucide-react";
import { updateTaskData } from "../utils/TaskDataFunctions";
import { UserContext } from "../context/userContext";

dayjs.extend(relativeTime);
function TaskAdd() {
  console.log("App Render ==>", Math.random());
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [data, setData] = useState([]);
  const [isTaskAdded, setIsTaskAdded] = useState(0);
  const [loader, setLoader] = useState(false);
  const {logout} = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get("http://localhost:4000/task");
        setData(response?.data?.tasks || []);
        setLoader(false);
      } catch (error) {
        console.error("Failed to fetch task:", error);
        setLoader(false);
      }
    };
    fetchData();
  }, [isTaskAdded]);

  const callBackFunc = async () => {
    console.log("Task added successfully");
    setIsTaskAdded(isTaskAdded + 1);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTaskData(id, newStatus);
      setUpdatedStatus((prev) => {
        return { ...prev, [id]: newStatus };
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/task/${id}`);
      setIsTaskAdded(isTaskAdded + 1);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const Capetilize = (value) => {
    const firstLatter = value.slice(0, 1).toUpperCase();
    const remainLatter = value.slice(1).toLowerCase();
    const captital = firstLatter + remainLatter;
    return captital;
  };

  return (

    <div className="h-fit min-h-dvh  bg-gray-800">
      
      <div className="flex justify-between items-center  bg-green-600">
        <h1 className="w-full text-3xl font-bold p-4 mb-2  text-white">
        Tasks
      </h1>
      <button
      onClick={logout}
       className="p-2 bg-black/[0.60] text-start m-2 justify-center items-center rounded-md text-green-600 shadow-md" >
        logout
      </button>
      </div>
      
      <main className="container mx-auto p-4">
        <TaskAddForm loader={loader} onTaskAdded={callBackFunc} />
      </main>
      <div className="mt-2 mx-auto ">
        <div className="h-dvh flex container mx-auto justify-center">
          <ul className="w-full p-4">
            {data?.length == 0 ? (
              <p className="text-center text-lg text-gray-400">
                No tasks available
              </p>
            ) : null}

            {data?.map((task) => (
              <li className="flex gap-x-2 " key={task._id}>
                <select
                  className="bg-black/[0.60] hover:bg-black border-none p-2 w-1/5 flex rounded-md justify-center  text-green-600 shadow-md my-2 outline-none "
                  defaultValue={task?.status}
                  onChange={(e) =>
                    handleStatusChange(task?._id, e.target?.value)
                  }
                >
                  <option value="done">Done</option>
                  <option value="inprogress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>

                <input
                  value={Capetilize(task?.task)}
                  disabled
                  className="p-2 flex text-start justify-between rounded-md w-full bg-black/[0.60] text-green-600 shadow-md my-2"
                />

                <div className="flex min-w-28 py-2 text-sm bg-black/[0.60] text-center justify-center items-center rounded-md text-green-600 shadow-md my-2">
                  {dayjs(task?.createdAt).fromNow()}
                </div>
                <button className="flex p-2 bg-black/[0.60] text-start justify-center items-center rounded-md text-green-600 shadow-md my-2">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="p-2 bg-black/[0.60] flex text-start justify-center items-center rounded-md text-green-600 shadow-md my-2"
                >
                  <Trash size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskAdd;
