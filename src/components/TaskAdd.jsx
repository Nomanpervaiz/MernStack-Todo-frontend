import { useContext, useEffect, useState } from "react";
import TaskAddForm from "../components/TaskAddForm";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Edit, LogOut, Trash } from "lucide-react";
import { updateTaskData } from "../utils/TaskDataFunctions";
import { UserContext } from "../context/userContext";
import { AppRoutes } from "../constant/AppRoutes";
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
        setLoader(true);
        const response = await axios.get(AppRoutes.task + "?userId=" + user.id);
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
    <div className="h-fit min-h-screen bg-gray-800">
      {/* Header */}
      <div className="flex justify-between p-2 items-center bg-green-600">
        <div className="flex flex-wrap justify-between items-center container mx-auto px-4 py-3">
          <h1 className="text-start flex items-center text-lg sm:text-xl md:text-3xl font-bold text-gray-200">
            Mern-Todo
          </h1>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition-all duration-300"
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
        <div className="flex flex-wrap container mx-auto justify-center">
          <ul className="w-full p-4 space-y-4">
            {data?.length === 0 ? (
              <p className="text-center text-lg text-gray-400">
                No tasks available
              </p>
            ) : null}

            {data?.map((task) => (
              <li
                key={task._id}
                className="bg-white/[0.10] p-4 rounded-md shadow-md space-y-4 md:space-y-0"
              >
                <div className="flex w-full mb-4 justify-center items-center rounded-md text-gray-200 text-sm md:text-base">
                  {dayjs(task?.createdAt).fromNow()}
                </div>

                <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                  <input
                    value={Capetilize(task?.task)}
                    disabled
                    className="flex-grow w-full md:w-2/3 p-2 rounded-md bg-black/[0.90] text-white shadow-md"
                  />

                  <select
                    className="w-full md:w-auto border-none p-2 rounded-md shadow-md outline-none"
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
                    className="w-full md:w-auto p-2.5 bg-red-600 text-white rounded-md shadow-md hover:bg-red-800 transition-all flex justify-center"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskAdd;
