import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserName, userProfile } from "../../redux/slices/userThunk";

export default function EditUserName(props) {


    const dispatch = useDispatch();

    const firstName = useSelector(state => state.user.user.firstName);
    const lastName = useSelector(state => state.user.user.lastName);
    const userName = useSelector(state => state.user.user.userName);
    const token = useSelector(state => state.user.token);

    const [newUserName, setNewUserName] = useState(userName);

    useEffect(() => {
        dispatch(userProfile(token));
    }, [dispatch, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (newUserName === "") {
            alert("Please fill in the 'User name' field.");
        } else {
            try {
                await dispatch(changeUserName(token, newUserName));
            } catch (error) {
                console.error("Error updating username :", error);
                alert("Error updating username. Please try again.");
            }
        }
    }


    return (
        <div className="edit-name">
            <h1>Edit user info</h1>

            <form className="form-edit-name">
                <div className="input-wrapper-username">
                    <label htmlFor="userName">User name:</label>
                    <input
                        type="text"
                        id="userName"
                        value={newUserName}
                        autoComplete="true"
                        onChange={(e) => setNewUserName(e.target.value)}
                    />
                </div>
                <div className="input-wrapper-username">
                    <label htmlFor="firstName">First name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        readOnly
                    />
                </div>
                <div className="input-wrapper-username">
                    <label htmlFor="lastName">Last name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        readOnly
                    />
                </div>
                <div className="buttons-username">
                    <button
                        type="submit"
                        className="buttons-edit"
                        onClick={(e) => {
                            handleSubmit(e);
                            props.setToggleEditUserName(false);
                        }}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="buttons-edit"
                        onClick={() => props.setToggleEditUserName(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}