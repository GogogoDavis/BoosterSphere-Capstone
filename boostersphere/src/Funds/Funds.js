import React, { useContext, useEffect, useState } from 'react';
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
import { userContext } from '../App';

export const Funds = () => {
  const { userdata, thisuser, setThisuser, fulluserData } = useContext(userContext);

  useEffect(() => {
    const getThisUserData = async () => {
      fulluserData.forEach((element) => {
        if (element.id === userdata.uid) {
          setThisuser(element);
        }
      });
    };
    if (fulluserData && userdata) getThisUserData();
  }, [fulluserData, userdata, setThisuser]);

  const [goals, setGoals] = useState([
    { id: 1, currentAmount: '', goalAmount: '', showProgress: true, isEditMode: false },
  ]);

  const handleCurrentAmountChange = (event, goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, currentAmount: event.target.value } : goal
    );
    setGoals(updatedGoals);
  };

  const [selectedGoal, setSelectedGoal] = useState(null);

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
      newTransaction: { amount: '', note: '' },
    };
    setGoals([...goals, newGoal]);
  };

  const handleCloseDialog = () => {
    setSelectedGoal(null);
  };

  return (
    <>
      <Sidebar />
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
