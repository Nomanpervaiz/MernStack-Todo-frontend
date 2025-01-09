import { useContext, useEffect, useState } from "react";
import TaskAddForm from "./TaskAddForm";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Edit, LogOut, Trash } from "lucide-react";
import { updateTaskData } from "../utils/TaskDataFunctions";
import { UserContext } from "../context/userContext";
import { AppRoutes } from "../constant/AppRoutes";
import Spinner from "./Spinner";
dayjs.extend(relativeTime);

function TaskAdd() {
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [data, setData] = useState([]);
  const [isTaskAdded, setIsTaskAdded] = useState(0);
  const [loader, setLoader] = useState(false);
  const { logout, user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Ap render", Math.random());
        setLoader(true);
        const response = await axios.get(
          `${AppRoutes.task}?userId=${user?._id}`
        );
        console.log(response?.data);
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
      await axios.delete(`${AppRoutes.task}/${id}`);
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
    <div className="h-fit min-h-screen bg-cyan-950">
      <div className="flex justify-between p-2 items-center bg-white">
        <div className="flex justify-between items-center container mx-auto px-4 py-3 ">
          <h1 className="text-start shadow-black shadow p-1 bg-cyan-600 flex items-center text-lg sm:text-xl  md:text-3xl font-bold text-white rounded-lg">
            Mern-Todo
          </h1>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-md transition-all duration-300"
          >
            Logout
            <LogOut className="ml-2" size={18} />
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <TaskAddForm loader={loader} onTaskAdded={callBackFunc} />
      </main>

      <div className="mt-2 mx-auto">
        <div className="flex container mx-auto justify-center">
          <ul className="w-full p-4 space-y-6">
            {
              loader ? null : 
            data?.length === 0 ? (
              <p className="text-center text-lg text-gray-400">
                No tasks available
              </p>
            ) : null}

            {loader
              ? <Spinner className={"flex justify-center w-full"}/>
              : data?.map((task) => (
                  <li
                    className="flex flex-wrap gap-4 items-center bg-cyan-400/[0.20] p-4 rounded-md shadow-md"
                    key={task._id}
                  >
                    <div className="flex w-full sm:w-auto md:w-40 text-center justify-center items-center bg-white p-1 sm:p-2 rounded-md text-black shadow-md">
                      {dayjs(task?.createdAt).fromNow()}
                    </div>

                    <input
                      value={Capetilize(task?.task)}
                      disabled
                      className="p-2 flex-grow text-start rounded-md bg-white text-black shadow-md"
                    />
                    <select
                      className="border-none p-2 w-auto flex rounded-md text-black shadow-md outline-none"
                      defaultValue={task?.status}
                      onChange={(e) =>
                        handleStatusChange(task?._id, e.target?.value)
                      }
                    >
                      <option value="done">Done</option>
                      <option value="inprogress">In Progress</option>
                      <option value="pending">Pending</option>
                    </select>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="p-2.5 bg-red-700 flex justify-center flex-1 sm:flex-none  items-center rounded-md text-white shadow-md hover:bg-red-600"
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
