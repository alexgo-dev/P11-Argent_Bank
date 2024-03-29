import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserName from "../../components/userName/userName";


export default function User() {

    const firstName = useSelector(state => state.user.user.firstName);
    const lastName = useSelector(state => state.user.user.lastName);
    
    const [toggleEditUserName, setToggleEditUserName] = useState(false);

    const handleEditUserName = () => {
        setToggleEditUserName(!toggleEditUserName)
    };

    return (
        <main className="main bg-dark">
            {toggleEditUserName ? (
                < EditUserName setToggleEditUserName={setToggleEditUserName} />
            ) : (
                <div className="editUserName">
                    <h1>Welcome back<br />{`${firstName} ${lastName}`}!</h1>
                    <button className="edit-button" onClick={handleEditUserName}>Edit Name</button>
                </div>
            )}
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    )
}