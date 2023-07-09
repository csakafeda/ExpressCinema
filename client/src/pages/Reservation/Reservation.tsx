import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {getAllSeats, purchaseSeats} from "../../API/seatAPI";

const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 6;

export const Reservation: React.FC = () => {
    const [seats, setSeats] = useState<{ id: number; status: string; userId: number | null }[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [showCard, setShowCard] = useState<boolean>(false);
    const [formData, setFormData] = useState<{
        firstname: string;
        lastname: string;
        email: string;
        address: string;
    }>({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        getAllSeats()
            .then((res) => setSeats(res))
            .finally(() => setIsLoading(false));
    }, []);


    const getSeatColor = (status: string, seatId: number): string => {
        if (selectedSeats.includes(seatId)) {
            return "blue";
        }
        switch (status) {
            case "available":
                return "green";
            case "reserved":
                return "yellow";
            case "sold":
                return "red";
            default:
                return "gray";
        }
    };

    const handleSeatClick = (seatId: number, seatStatus: string) => {
        if (seatStatus === "available") {
            if (selectedSeats.includes(seatId)) {
                setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
            } else {
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };

    const handleFormDisplay = () => {
        setShowCard(true);
    };
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
    const handlePurchase = () => {
        purchaseSeats(selectedSeats, formData);
    }

    const renderSeats = () => {
        const seatGrid = [];
        for (let row = 0; row < ROWS.length; row++) {
            const rowSeats = [];
            for (let seat = 1; seat <= SEATS_PER_ROW; seat++) {
                const seatId = row * SEATS_PER_ROW + seat;
                const seatStatus = getSeatStatus(seatId);
                rowSeats.push(
                    <div
                        key={seatId}
                        style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: getSeatColor(seatStatus, seatId),
                            margin: "5px",
                            cursor: seatStatus === "available" ? "pointer" : "not-allowed",
                        }}
                        onClick={() => handleSeatClick(seatId, seatStatus)}
                    ></div>
                );
            }
            seatGrid.push(
                <div key={ROWS[row]} style={{display: "flex", alignItems: "center"}}>
                    <div style={{width: "20px"}}>{ROWS[row]}</div>
                    <div style={{display: "flex", justifyContent: "center"}}>{rowSeats}</div>
                </div>
            );
        }
        return seatGrid;
    };

    const getSeatStatus = (seatId: number): string => {
        const seat = seats.find((seat) => seat.id === seatId);
        return seat ? seat.status : "unavailable";
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <>
            <div style={{textAlign: "center", marginTop: "2rem"}}>Make your reservation for tomorrow.</div>
            <Grid container style={{marginTop: "2rem", justifyContent: "center"}}>
                <Grid item xs={12} md={6} style={{justifyContent: "center"}}>
                    {renderSeats()}
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" marginTop="2rem">
                <Button variant="contained" onClick={handleFormDisplay}>
                    Purchase
                </Button>
            </Box>
            {showCard && (
                <Grid container justifyContent="center" style={{marginTop: "2rem"}}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Reservation Details</Typography>
                                <Typography variant="subtitle1">Selected Seats:</Typography>
                                {selectedSeats.map((seatId) => (
                                    <Typography key={seatId} variant="body2">
                                        Seat {seatId}
                                    </Typography>
                                ))}
                                <TextField
                                    required
                                    label="Firstname"
                                    value={formData.firstname}
                                    onChange={handleFirstnameChange}
                                    style={{marginBottom: "1rem"}}
                                />
                                <TextField
                                    required
                                    label="Lastname"
                                    value={formData.lastname}
                                    onChange={handleLastnameChange}
                                    style={{marginBottom: "1rem"}}
                                />
                                <TextField
                                    required
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                    style={{marginBottom: "1rem"}}
                                    type={"email"}
                                />
                                <TextField
                                    required
                                    label="Address"
                                    value={formData.address}
                                    onChange={handleAddressChange}
                                    style={{marginBottom: "1rem"}}
                                />

                                <Button variant="contained" color="primary" style={{marginTop: "1rem"}}
                                        onClick={handlePurchase}>
                                    Confirm Reservation
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </>
    );
};
