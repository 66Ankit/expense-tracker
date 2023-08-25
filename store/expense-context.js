import React, { Children } from 'react'
import { createContext, useReducer } from 'react'




export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ title, amount, date }) => { },
    setExpenses: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { title, amount, date }) => { }
})


const expenseReducer = (state, action) => {

    switch (action.type) {
        case 'ADD':
            
            return [{ ...action.payload}, ...state]
        case 'UPDATE':
            const updateIndex = state.findIndex((expense) => expense.id === action.payload.id)
            const oldData = state[updateIndex]
            const updatedData = { ...oldData, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updateIndex] = updatedData
            return updatedExpenses
        case 'DELETE':
            console.log(id)
            return state.filter((expense) => expense.id !== action.payload.id)
        case 'SET':
            return action.payload
        default:
            return state

    }

}


function ExpenseContextProvider({ children }) {


    const [expenseState, dispatch] = useReducer(expenseReducer, []);


    const setExpenses = (expenses) => {
        dispatch({ type: 'SET', payload: expenses })
    }

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    const deleteExpense = (id) => {
        dispatch({ type: 'DELETE', payload: { id: id } })
    }

    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    }

    return (

        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContextProvider