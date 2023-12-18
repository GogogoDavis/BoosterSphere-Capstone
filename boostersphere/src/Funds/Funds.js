

import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';
import {
  LinearProgress,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './Funds.css';
import { Sidebar } from '../Sidebar/Sidebar';

export const Funds = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Goal 1',
      currentAmount: '',
      goalAmount: '',
      transactions: [],
      showProgress: true,
      isEditMode: false,
      deadline: new Date('2023-12-31T23:59:59'), // Set the deadline
      newTransaction: { amount: '', note: '' },
    },
    // Add more initial goals as needed
  ]);

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editDeadlineGoal, setEditDeadlineGoal] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Force a re-render every second to update the countdown
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (deadline) => {
    const now = new Date();
    const timeDifference = deadline.getTime() - now.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

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
            currentAmount: (parseFloat(goal.currentAmount) || 0) + parseFloat(goal.newTransaction.amount),
            transactions: [...goal.transactions, goal.newTransaction],
            showProgress: true,
            isEditMode: false,
            newTransaction: { amount: '', note: '' },
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

  const handleTransactionHistoryClick = (goalId) => {
    const goal = goals.find((goal) => goal.id === goalId);
    if (goal) {
      setSelectedGoal(goal);
    }
  };

  const handleNewTransactionAmountChange = (event, goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId
        ? { ...goal, newTransaction: { ...goal.newTransaction, amount: event.target.value } }
        : goal
    );
    setGoals(updatedGoals);
  };

  const handleNewTransactionNoteChange = (event, goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, newTransaction: { ...goal.newTransaction, note: event.target.value } } : goal
    );
    setGoals(updatedGoals);
  };

  const handleAddGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      currentAmount: '',
      goalAmount: '',
      transactions: [],
      showProgress: false,
      isEditMode: true,
      deadline: new Date(), // Set a default deadline for new goals
      newTransaction: { amount: '', note: '' },
    };
    setGoals([...goals, newGoal]);
  };

  const handleCloseDialog = () => {
    setSelectedGoal(null);
  };

  const handleGoalNameChange = (event, goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: event.target.value } : goal
    );
    setGoals(updatedGoals);
  };

  const handleEditDeadlineClick = (goalId) => {
    setEditDeadlineGoal(goals.find((goal) => goal.id === goalId));
  };

  const handleEditDeadlineSave = (goalId, newDeadline) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, deadline: newDeadline } : goal
    );
    setGoals(updatedGoals);
    setEditDeadlineGoal(null);
  };

  const getProgressBarColor = (completionPercentage) => {
    if (completionPercentage >= 100) {
      return 'green';
    } else if (completionPercentage >= 50) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const totalFunds = goals.reduce((acc, goal) => acc + parseFloat(goal.currentAmount || 0), 0);

  return (
    <>
      <div className='parent-container'>
        <Sidebar />
        <div className='main'>
          <h1>Funds</h1>
          <p className="back" onClick={() => window.history.back()}>
            Back
          </p>

          <Typography variant="h6" style={{ marginBottom: '16px' }}>
            Total Funds: {totalFunds}
          </Typography>

          {goals.map((goal) => (
            <div key={goal.id}>
              {goal.showProgress && !goal.isEditMode && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      type="text"
                      value={goal.name}
                      onChange={(event) => handleGoalNameChange(event, goal.id)}
                    />
                    <Button variant="contained" onClick={() => handleTransactionHistoryClick(goal.id)}>
                      Transaction History
                    </Button>
                    <Button variant="contained" onClick={() => handleEditDeadlineClick(goal.id)}>
                      Edit Deadline
                    </Button>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={(goal.currentAmount / goal.goalAmount) * 100 || 0}
                    sx={{ backgroundColor: getProgressBarColor((goal.currentAmount / goal.goalAmount) * 100) }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <Typography variant="body2">
                      {goal.currentAmount} / {goal.goalAmount}
                    </Typography>
                    <Typography variant="body2">
                      {((goal.currentAmount / goal.goalAmount) * 100).toFixed(2)}% Complete
                    </Typography>
                    {goal.deadline && (
                      <Typography variant="body2">
                        Time Remaining: {getRemainingTime(goal.deadline).days} days, {getRemainingTime(goal.deadline).hours} hours,
                        {getRemainingTime(goal.deadline).minutes} minutes, {getRemainingTime(goal.deadline).seconds} seconds
                      </Typography>
                    )}
                  </div>
                  <Button variant="contained" onClick={() => handleEditClick(goal.id)}>
                    Edit
                  </Button>
                </>
              )}

              {goal.isEditMode && (
                <>
                  <div>
                    <Typography variant="subtitle2">Goal</Typography>
                    <TextField
                      type="number"
                      value={goal.goalAmount}
                      onChange={(event) => handleGoalAmountChange(event, goal.id)}
                      placeholder="Enter Goal Amount"
                    />
                  </div>

                  <div>
                    <Typography variant="subtitle2">New Transaction Amount</Typography>
                    <TextField
                      type="number"
                      value={goal.newTransaction.amount}
                      onChange={(event) => handleNewTransactionAmountChange(event, goal.id)}
                      placeholder="Enter Amount"
                    />
                  </div>

                  <div>
                    <Typography variant="subtitle2">New Transaction Note</Typography>
                    <TextField
                      type="text"
                      value={goal.newTransaction.note}
                      onChange={(event) => handleNewTransactionNoteChange(event, goal.id)}
                      placeholder="Enter Note"
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

          <Dialog open={selectedGoal !== null} onClose={handleCloseDialog}>
            <DialogTitle>{selectedGoal ? `Transactions for ${selectedGoal.name}` : ''}</DialogTitle>
            <DialogContent>
              {selectedGoal && selectedGoal.transactions.length > 0 ? (
                <ul>
                  {selectedGoal.transactions.map((transaction, index) => (
                    <li key={index}>
                      Amount: {transaction.amount}, Note: {transaction.note}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No transactions available.</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={editDeadlineGoal !== null} onClose={() => setEditDeadlineGoal(null)}>
            <DialogTitle>Edit Deadline</DialogTitle>
            <DialogContent>
              <TextField
                type="datetime-local"
                value={editDeadlineGoal ? editDeadlineGoal.deadline.toISOString().slice(0, -8) : ''}
                onChange={(event) => setEditDeadlineGoal({
                  ...editDeadlineGoal,
                  deadline: new Date(event.target.value),
                })}
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDeadlineGoal(null)}>Cancel</Button>
              <Button onClick={() => handleEditDeadlineSave(editDeadlineGoal.id, editDeadlineGoal.deadline)}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};
