export const getAllSeats = () => {
    return fetch("http://localhost:8080/api/seats")
        .then((res) => res.json())
        .catch((error) => {
            console.error("Error fetching seats:", error);
        })
};

export const purchaseSeats = (seats, formData) => {

}