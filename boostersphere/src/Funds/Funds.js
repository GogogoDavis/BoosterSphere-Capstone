import React, { useState } from 'react';
import { LinearProgress, Button, TextField, Typography } from '@mui/material';
import './Funds.css';

export const Funds = () => {
    const [goals, setGoals] = useState([
        { id: 1, currentAmount: '', goalAmount: '', showProgress: true, isEditMode: false },
    ]);

    const handleCurrentAmountChange = (event, goalId) => {
        const updatedGoals = goals.map((goal) =>
            goal.id === goalId ? { ...goal, currentAmount: event.target.value } : goal
        );
        setGoals(updatedGoals);
    };

    const handleGoalAmountChange = (event, goalId) => {
        const updatedGoals = goals.map((goal) =>
            goal.id === goalId ? { ...goal, goalAmount: event.target.value } : goal
        );
        setGoals(updatedGoals);
    };

    const handleAmountSubmit = (goalId) => {
        const updatedGoals = goals.map((goal) =>
            goal.id === goalId
                ? {
                    ...goal,
                    showProgress: true,
                    isEditMode: false,
                }
                : goal
        );
        setGoals(updatedGoals);
    };

    const handleEditClick = (goalId) => {
        const updatedGoals = goals.map((goal) =>
            goal.id === goalId ? { ...goal, isEditMode: true } : goal
        );
        setGoals(updatedGoals);
    };

    const handleAddGoal = () => {
        const newGoal = {
            id: goals.length + 1,
            currentAmount: '',
            goalAmount: '',
            showProgress: false,
            isEditMode: true,
        };
        setGoals([...goals, newGoal]);
    };

    return (
        <>
            <h1>Funds</h1>
            <p className="back" onClick={() => window.history.back()}>
                Back
            </p>

            {goals.map((goal) => (
                <div key={goal.id}>
                    {goal.showProgress && !goal.isEditMode && (
                        <>
                            <Typography variant="h6">Goal {goal.id}</Typography>
                            <LinearProgress
                                variant="determinate"
                                value={(goal.currentAmount / goal.goalAmount) * 100 || 0}
                            />
                            <Typography variant="body2">
                                {((goal.currentAmount / goal.goalAmount) * 100).toFixed(2)}% Complete
                            </Typography>
                            <Button variant="contained" onClick={() => handleEditClick(goal.id)}>
                                Edit
                            </Button>
                        </>
                    )}

                    {goal.isEditMode && (
                        <>
                            <div>
                                <Typography variant="h6">Edit Goal {goal.id}</Typography>
                                <Typography variant="subtitle2">Total amount in savings</Typography>
                                <TextField
                                    type="number"
                                    value={goal.currentAmount}
                                    onChange={(event) => handleCurrentAmountChange(event, goal.id)}
                                    placeholder="Enter Current Amount"
                                />
                            </div>

                            <div>
                                <Typography variant="subtitle2">Goal</Typography>
                                <TextField
                                    type="number"
                                    value={goal.goalAmount}
                                    onChange={(event) => handleGoalAmountChange(event, goal.id)}
                                    placeholder="Enter Goal Amount"
                                />
                            </div>

                            <Button variant="contained" onClick={() => handleAmountSubmit(goal.id)}>
                                Save
                            </Button>
                        </>
                    )}
                </div>
            ))}

            <Button variant="contained" onClick={handleAddGoal}>
                Add Goal
            </Button>
        </>
    );
};
