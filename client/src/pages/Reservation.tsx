import React, { useEffect, useState } from "react";

export const Reservation: React.FC = () => {
    const [seats, setSeats] = useState<{ id: number, status: string, userId: number | null }[]>([]);

    const getAllSeats = () => {
        fetch("http://localhost:8080/api/seats")
            .then((res) => res.json())
            .then((seats) => {
                setSeats(seats);
                console.log(seats);
            })
            .catch((error) => {
                console.error("Error fetching seats:", error);
            });
    };

    useEffect(() => {
        getAllSeats();
    }, []);

    const getSeatColor = (status: string): string => {
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

    return (
        <>
            <div> Make your reservation for tomorrow.</div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    maxWidth: "400px",
                    margin: "0 auto",
                }}
            >
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: getSeatColor(seat.status),
                            margin: "5px",
                        }}
                    ></div>
                ))}
            </div>
        </>
    );
};
