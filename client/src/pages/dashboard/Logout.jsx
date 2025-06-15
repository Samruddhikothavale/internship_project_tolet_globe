import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        try {
            localStorage.removeItem("user");
            alert("Logout successfull");
            navigate("/");
        }
        catch(e) {
            alert("Error occured . try after sometime !");
        }
    }
    return (
        <>

            <h2 className="text-2xl font-bold mb-4">Do you want to log out from your account</h2>

            <button onClick={handleLogout}
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
                Logout
            </button>


        </>
    )
}