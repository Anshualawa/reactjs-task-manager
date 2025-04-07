import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../AuthContext";

export default function TaskList() {
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        if (token) fetchTasks();
    }, [token]);

    const handleCreate = async () => {
        try {
            if (!newTask.trim()) return;
            await API.post(
                "/tasks",
                { title: newTask },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setNewTask("");
            fetchTasks();
        } catch (err) {
            console.error("Error creating task:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleComplete = async (id) => {
        try {
            await API.put(
                `/tasks/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            fetchTasks();
        } catch (err) {
            console.error("Error completing task:", err);
        }
    };

    return (
        <div className="space-y-4 max-w-xl mx-auto p-4">
            <div className="flex gap-2">
                <input
                    className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="New task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    onClick={handleCreate}
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {tasks.length === 0 ? (
                    <li className="text-gray-500 italic">No tasks yet. Add one!</li>
                ) : (
                    tasks.map((task) => (
                        <li
                            key={task.ID}
                            className={`flex justify-between items-center border rounded p-3 ${task.Completed ? "bg-green-100 line-through" : "bg-white"
                                }`}
                        >
                            <span>{task.Title}</span>
                            <div className="flex gap-2">
                                {!task.Completed && (
                                    <button
                                        onClick={() => handleComplete(task.ID)}
                                        className="text-green-600 hover:text-green-800"
                                        title="Mark as complete"
                                    >
                                        ✅
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(task.ID)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete task"
                                >
                                    ❌
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
