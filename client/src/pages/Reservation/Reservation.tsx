import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {getAllSeats, purchaseSeats, reserveSeats} from "../../API/seatAPI";
import {useNavigate} from "react-router-dom";
import Counter from "./Counter";

const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 6;

export const Reservation: React.FC = () => {
    const navigate = useNavigate();

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
    const [isCounting, setIsCounting] = useState<boolean>(false);

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
                setIsCounting(true);
                reserveSeats(seatId, 1);
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
        alert("Payment successful. Check your email with the confirmation.");
        navigate("/");
    };

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
                    >{seatId}</div>
                );
            }
            seatGrid.push(
                <div key={ROWS[row]}
                     style={{display: "flex", alignItems: "center", margin: "10px 0"}}>
                    <div style={{display: "flex", justifyContent: "center", gap: "5px"}}>
                        {rowSeats}
                    </div>
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
        <div style={{paddingBottom: "2rem"}}>
            <div style={{textAlign: "center", marginTop: "5vh"}}>
                Make your reservation for tomorrow.
            </div>
            {isCounting ? (
                <Counter seatIds={selectedSeats} navigate={navigate} setIsCounting={setIsCounting}/>
            ) : (
                <></>
            )}
            <Grid container style={{justifyContent: "center"}}>
                <Grid item md={2} style={{justifyContent: "center"}}>
                    {renderSeats()}
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" marginTop="2rem">
                <Button variant="contained" onClick={handleFormDisplay}>
                    Purchase
                </Button>
            </Box>
            {showCard && (
                <Grid container justifyContent="center" style={{marginTop: "2rem", marginBottom: "15vh"}}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Reservation Details
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Selected Seats:
                                </Typography>
                                {selectedSeats.map((seatId) => (
                                    <Typography key={seatId} variant="body2" gutterBottom>
                                        Seat {seatId}
                                    </Typography>
                                ))}
                                <form onSubmit={handlePurchase}>
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
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
