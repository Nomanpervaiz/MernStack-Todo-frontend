import axios from "axios";
import { useForm } from "react-hook-form";

function TaskAddForm({ loader ,onTaskAdded }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/task", {
        task: data?.task,
        status: data?.status,
      });
      console.log("response in taskadd ==>", response.data);
      reset();
      onTaskAdded()
    } catch (error) {
      console.log("error in onsubmit ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <input
          {...register("task", { required: true })}
          type="text"
          placeholder="Add a new task"
          aria-label="New task"
          className="flex-grow outline-none border-none px-2 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loader}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded">
           { loader ? "Adding...": "Add Task" }
        </button>
      </div>
      <div>
        <select
          {...register("status")}
          className="border bg-white outline-none border-none text-black px-2 py-2 rounded w-full"
          defaultValue={"pending"}>
          <option value="done">done</option>
          <option value="inprogress">In Progress</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </form>
  );
}

export default TaskAddForm;