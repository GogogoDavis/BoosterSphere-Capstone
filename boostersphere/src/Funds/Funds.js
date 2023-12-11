import React, { useState } from 'react';
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
      newTransaction: { amount: '', note: '' },
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState(null);

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

  const handleGoalNameChange = (event, goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: event.target.value } : goal
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
      name: `Goal ${goals.length + 1}`,
      currentAmount: '',
      goalAmount: '',
      transactions: [],
      showProgress: false,
      isEditMode: true,
      newTransaction: { amount: '', note: '' },
    };
    setGoals([...goals, newGoal]);
  };

  const handleCloseDialog = () => {
    setSelectedGoal(null);
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  type="text"
                  value={goal.name}
                  onChange={(event) => handleGoalNameChange(event, goal.id)}
                />
                <Button variant="contained" onClick={() => handleTransactionHistoryClick(goal.id)}>
                  Transaction History
                </Button>
              </div>
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
    </>
  );
};

