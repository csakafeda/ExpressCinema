import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Countdown from "react-countdown";
import {NavigateFunction} from "react-router-dom";

interface CounterProps {
    seatIds: number[];
    navigate: NavigateFunction;
    setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
    isCounting: boolean
}

const Counter: React.FC<CounterProps> = ({seatIds, navigate, setIsCounting, isCounting}) => {
    const time = 120000;
    const [remainingTime, setRemainingTime] = useState<number | null>(time);

    const onComplete = () => {
        fetch("http://localhost:8080/api/seats/reserve_expire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({seatIds: seatIds})
        })
            .then(() => {
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
        if (remainingTime !== null) {
            if (remainingTime <= 0) {
                onComplete();
            }
        }
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) =>
                prevRemainingTime != null ? prevRemainingTime - 1000 : null
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isCounting && seatIds.length > 0) {
            setRemainingTime(time);
        }
    }, [seatIds, isCounting]);

    return (
        <>
            {isCounting ? (
                <div style={{textAlign: "center", marginTop: "5vh"}}>
                    We reserve your seats for 2 minutes. If you are not interact with the page, your reservation will be lost.
                    <br/>
                    Time left:
                    <Typography component="div" align="center">
                        {remainingTime != null && (
                            <Countdown
                                date={Date.now() + remainingTime}
                                onComplete={onComplete}
                                renderer={(props) => <span>{Math.floor(props.total / 1000)}</span>}
                                autoStart
                            />
                        )}
                    </Typography>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Counter;
