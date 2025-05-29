import { NavLink } from "react-router-dom";

export const Error = ()=>{
    return (
        <>
            <div className="error-page">
                <div className=" content">
                    <h2 className="header">404</h2>
                    <h4>Page Not Found !</h4>
                    <div className="btns">
                        <NavLink to="/">Return home</NavLink>
                        <NavLink to="/contact">Report problem</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
};