import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Grid, Typography,} from "@mui/material";
import {getAllSeats, purchaseSeats, reserveSeats, unreserveSeats} from "../../API/seatAPI";
import {useNavigate} from "react-router-dom";
import Counter from "./Counter";
import ReservationForm from "./ReservationForm";

const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 6;
const COLOR_SIGNS = [
    {color: "green", label: "Available Seats"},
    {color: "yellow", label: "Reserved Seats"},
    {color: "red", label: "Sold Seats"},
    {color: "blue", label: "Your selected Seats"},
];

export const Reservation: React.FC<{ socket: any }> = (props) => {
    const {socket} = props;
    const navigate = useNavigate();

    const [seats, setSeats] = useState<{ id: number; status: string; userId: number | null }[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [receivedSelectedSeats, setReceivedSelectedSeats] = useState<number[]>([]);
    const [showCard, setShowCard] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    useEffect(() => {
        socket.on("receive_message", (data: { message: string }) => {
            const parsedSelectedSeats = JSON.parse(data.message);
            setReceivedSelectedSeats(parsedSelectedSeats);
            const updatedSeats = seats.map((seat) => {
                if (parsedSelectedSeats.includes(seat.id)) {
                    return {...seat, status: "available"};
                }
                return seat;
            });
            setSeats(updatedSeats);
        });
        getAllSeats()
            .then((res) => setSeats(res));
    }, [socket, seats]);

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
        if (receivedSelectedSeats.includes(seatId)) {
            return "yellow";
        }
        switch (status) {
            case "available":
                return "green";
            case "sold":
                return "red";
            case "reserved":
                return selectedSeats.includes(seatId) ? "blue" : "yellow";
            default:
                return "gray";
        }
    };

    const handleSeatClick = (seatId: number, seatStatus: string) => {
        if (seatStatus === "available") {
            handleSeatSelection(seatId);
        } else if (seatStatus === "reserved" || seatStatus === "selected") {
            handleSeatDeselection(seatId);
        }
    };

    const handleSeatSelection = (seatId: number) => {
        // Check if the seat is already selected
        if (selectedSeats.includes(seatId)) {
            return;
        }

        const updatedSelectedSeats = [...selectedSeats, seatId];
        setSelectedSeats(updatedSelectedSeats);
        setIsCounting(true);
        reserveSeats(seatId, 1) // Reserve the seat
            .then(() => {
                socket.emit("send_message", {
                    message: JSON.stringify(updatedSelectedSeats),
                });
                const updatedSeats = seats.map((seat) => {
                    if (seat.id === seatId) {
                        return {...seat, status: "reserved", userId: null};
                    }
                    return seat;
                });
                setSeats(updatedSeats);
                setReceivedSelectedSeats([...receivedSelectedSeats, seatId]);
            })
    };

    const handleSeatDeselection = (seatId: number) => {
        // Check if the seat is already deselected or not selected
        if (!selectedSeats.includes(seatId)) {
            return;
        }

        const updatedSelectedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== seatId);
        setSelectedSeats(updatedSelectedSeats);
        setIsCounting(false);
        unreserveSeats(seatId)
            .then(() => {
                socket.emit("send_message", {
                    message: JSON.stringify(updatedSelectedSeats),
                });
                const updatedSeats = seats.map((seat) => {
                    if (seat.id === seatId) {
                        return {...seat, status: "available", userId: null};
                    }
                    return seat;
                });
                setSeats(updatedSeats);
                setReceivedSelectedSeats(receivedSelectedSeats.filter((selectedSeat) => selectedSeat !== seatId));
            });
    };

    const handleFormDisplay = () => {
        setShowCard(true);
    };

    const handlePurchase = (formData: { firstname: string; lastname: string; email: string; address: string }) => {
        purchaseSeats(selectedSeats, formData).then(() => {
            const updatedSeats = seats.map((seat) => {
                if (selectedSeats.includes(seat.id)) {
                    return {...seat, status: "sold"};
                }
                return seat;
            });
            setSeats(updatedSeats);
        });

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
                const seatColor = getSeatColor(seatStatus, seatId);
                rowSeats.push(
                    <div
                        key={seatId}
                        style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: getSeatColor(seatStatus, seatId),
                            margin: "0.3rem 0.1rem 0.3rem 0.1rem",
                            cursor: seatColor === "blue" ? "pointer" : seatStatus === "available" ? "pointer" : "not-allowed",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={() => handleSeatClick(seatId, seatStatus)}
                    >
                        {seatId}
                    </div>
                );
            }
            seatGrid.push(
                <div
                    key={ROWS[row]}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0.3rem 0.1rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "5px",
                            alignItems: "center",
                        }}
                    >
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
        <div>
            <h2 style={{textAlign: "center", marginTop: "5vh"}}>
                Make your reservation for tomorrow's movie.
            </h2>

            {isCounting ? (
                <div style={{textAlign: "center", marginTop: "5vh"}}>
                    We reserve your seats for 2 minutes.
                    <br/>
                    Time left: <Counter seatIds={selectedSeats} navigate={navigate} setIsCounting={setIsCounting}/>
                </div>
            ) : (
                <></>
            )}

            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem"}}>
                <div style={{padding: "0.3rem", borderStyle: "outset"}}>
                    <p
                        style={{
                            minWidth: "100px",
                            height: "5vh",
                            background: "black",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Screen
                    </p>

                    <Grid container style={{justifyContent: "center"}}>
                        <Grid item md={2} style={{justifyContent: "center"}}>
                            {renderSeats()}
                        </Grid>
                    </Grid>
                </div>

                <div style={{backgroundColor: "white"}}>
                    {COLOR_SIGNS.map((colorSign) => (
                        <div key={colorSign.color} style={{display: "flex", alignItems: "center", padding: "0.3rem"}}>
                            <div style={{
                                width: "15px",
                                height: "15px",
                                backgroundColor: colorSign.color,
                                marginRight: "1vw"
                            }}/>
                            <Typography variant="body2">{colorSign.label}</Typography>
                        </div>
                    ))}
                </div>
            </div>
            <Box display="flex" justifyContent="center" marginTop="2rem">
                <Button variant="contained" onClick={() => {
                    setButtonClicked(true);
                    handleFormDisplay();
                }}>
                    Purchase
                </Button>
            </Box>
            {showCard && selectedSeats.length > 0 ? (
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
                                <ReservationForm handlePurchase={handlePurchase}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <div style={{
                    display: buttonClicked && selectedSeats.length === 0 ? "block" : "none",
                    color: "red",
                    textAlign: "center",
                    margin: "0.3rem"
                }}>
                    You haven't selected any seats.
                </div>
            )}
        </div>
    );
};
