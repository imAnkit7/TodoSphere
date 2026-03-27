import React, { useContext } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { HistLenContext } from "../App";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import "./todo.css"

ChartJS.register(ArcElement, Tooltip); 

export default function Dash(props) {
    const { completedCount, setCompletedCount } = useContext(HistLenContext);
    const a = props.task;
    const b = completedCount;
    const total = a == 0 ? 0 + b : a + b;

    return (
        <center>
            <div className="show my-3">
                <div className="container"><FaCheckCircle style={{ color: 'green' }} /> Total Task {total}</div>
                <div className="container"><FaCheckCircle style={{ color: 'green' }} /> Completed {b}</div>
                <div className="container"><FaExclamationCircle style={{ color: 'red' }} /> Pending {a}</div>
            </div>
        </center>
    );
}