const baseUrl = "http://express-cinema-backend.vercel.app";

export const getAllSeats = () => {
    return fetch(baseUrl + "/api/seats")
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error fetching seats:", error);
        })
};

export const reserveSeats = (seat, userId) => {
    return fetch(baseUrl + "/api/seats/reserve", {
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

export const purchaseSeats = (seats, formData) => {
    return fetch(baseUrl + "/api/seats/pay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({seatIds: seats, userId: 1, email: formData.email})
    })
        .then((response) => {
            if (response.ok) {
                console.log("Pay successful!");
            } else {
                console.error("Failed to make payment.");
            }
        })
        .catch((error) => {
            console.error("Error making payment:", error);
        });
}

export const unreserveSeats = (seatId) => {
    return fetch(baseUrl + "/api/seats/reserve_expire", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({seatIds: [seatId]})
    })
        .then((response) => {
            if (response.ok) {
                console.log("Unreserved successful!");
            }
        })
        .catch((error) => {
            console.error("Error making reservation:", error);
        });
}