import { useAuth } from "../AuthContext";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handlerLogout = () => {
        console.log("You clicked logout button");
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600">📝 Task Manager</h1>
                    <button
                        onClick={handlerLogout}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                <TaskList />
            </div>
        </div>
    );
}
