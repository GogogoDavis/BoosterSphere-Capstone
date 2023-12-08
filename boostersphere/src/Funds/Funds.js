import React, { useState } from 'react';
import { LinearProgress, Button, TextField, Typography } from '@mui/material';
import './Funds.css';

export const Funds = () => {
    const [currentAmount, setCurrentAmount] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [showProgress, setShowProgress] = useState(false);

    const handleCurrentAmountChange = (event) => {
        setCurrentAmount(event.target.value);
    };

    const handleGoalAmountChange = (event) => {
        setGoalAmount(event.target.value);
    };

    const handleAmountSubmit = () => {
        console.log('Current Amount Submitted:', currentAmount);
        console.log('Goal Amount Submitted:', goalAmount);
        setShowProgress(true);
    };

    // Calculate progress percentage
    const progress = goalAmount !== 0 ? (currentAmount / goalAmount) * 100 : 0;

    return (
        <>
            <h1>Funds</h1>
            <p className="back" onClick={() => window.history.back()}>
                Back
            </p>

            <div>
                <Typography variant="h6">Total amount in savings</Typography>
                <TextField
                    type="number"
                    value={currentAmount}
                    onChange={handleCurrentAmountChange}
                    placeholder="Enter Current Amount"
                />
            </div>

            <div>
                <Typography variant="h6">Goal</Typography>
                <TextField
                    type="number"
                    value={goalAmount}
                    onChange={handleGoalAmountChange}
                    placeholder="Enter Goal Amount"
                />
            </div>

            <Button variant="contained" onClick={handleAmountSubmit}>
                Submit
            </Button>

            {showProgress && (
                <>
                    <Typography variant="body2">
                        Entered Current Amount: {currentAmount}
                    </Typography>
                    <Typography variant="body2">
                        Entered Goal Amount: {goalAmount}
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography variant="body2">{progress.toFixed(2)}% Complete</Typography>
                </>
            )}
        </>
    );
};
