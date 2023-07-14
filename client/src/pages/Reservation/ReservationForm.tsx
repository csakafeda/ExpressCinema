import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

const ReservationForm = ({handlePurchase}: {
    handlePurchase: (formData: { firstname: string; lastname: string; email: string; address: string }) => void;
}) => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
    });

    const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, firstname: e.target.value});
    };

    const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, lastname: e.target.value});
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, email: e.target.value});
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, address: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handlePurchase(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                label="Firstname"
                value={formData.firstname}
                onChange={handleFirstnameChange}
                fullWidth
                margin="normal"
            />
            <TextField
                required
                label="Lastname"
                value={formData.lastname}
                onChange={handleLastnameChange}
                fullWidth
                margin="normal"
            />
            <TextField
                required
                label="Email"
                value={formData.email}
                onChange={handleEmailChange}
                type="email"
                fullWidth
                margin="normal"
            />
            <TextField
                required
                label="Address"
                value={formData.address}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                style={{marginTop: "1rem"}}
                type="submit"
            >
                Confirm Payment
            </Button>
        </form>
    );
};

export default ReservationForm;
