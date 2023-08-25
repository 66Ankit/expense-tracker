import React, { useContext } from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../constants/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'

function AllExpenses({ navigate }) {
    const expenseCtx = useContext(ExpenseContext)
    return (
        <ExpensesOutput expenses={expenseCtx.expenses} expensePeriod='Total' fallbackText='No registered expenses found' />
    )
}

export default AllExpenses