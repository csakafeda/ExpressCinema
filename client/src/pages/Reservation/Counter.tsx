import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Countdown from "react-countdown";
import {NavigateFunction} from "react-router-dom";

interface CounterProps {
    seatIds: number[];
    navigate: NavigateFunction;
    setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Counter: React.FC<CounterProps> = ({seatIds, navigate, setIsCounting}) => {
    const time = 2 * 60 * 1000;
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    const onComplete = () => {
        fetch("http://localhost:8080/api/seats/reserve_expire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({seatIds: seatIds})
        })
            .then((response) => {
                alert("Your reservation time is up!");
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                navigate("/");
                setIsCounting(false);
            });
    };

    useEffect(() => {
        const storedRemainingTime = localStorage.getItem("remainingTime");
        if (storedRemainingTime) {
            const parsedTime = JSON.parse(storedRemainingTime);
            setRemainingTime(parsedTime);
        } else {
            setRemainingTime(time);
        }

        const timer = setTimeout(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime != null ? prevRemainingTime - 1000 : null);
        }, 1000);

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, []);

    useEffect(() => {
        if (remainingTime !== null) {
            localStorage.setItem("remainingTime", JSON.stringify(remainingTime));
            if (remainingTime <= 0) {
                onComplete();
            }
        }
    }, [remainingTime]);

    return (
        <Typography component="span" align="center">
            <div className="counter">
                {remainingTime && (
                    <Countdown
                        date={Date.now() + remainingTime}
                        onComplete={onComplete}
                        renderer={(props) => <span>{props.total / 1000}</span>}
                        autoStart
                    />
                )}
            </div>
        </Typography>
    );
};

export default Counter;
