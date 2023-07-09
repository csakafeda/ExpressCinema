export const getAllSeats = () => {
    return fetch("http://localhost:8080/api/seats")
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error fetching seats:", error);
        })
};

export const purchaseSeats = (seats, formData) => {

}

export const reserveSeats = (seat, userId) => {
    return fetch("http://localhost:8080/api/seats/reserve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({seatId: seat, userId: userId})
    })
        .then((response) => {
            if (response.ok) {
                console.log("Reservation successful!");
            } else {
                console.error("Failed to make reservation.");
            }
        })
        .catch((error) => {
            console.error("Error making reservation:", error);
        });
}