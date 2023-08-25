import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ExpensesOutput from '../constants/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import ErrorOverlay from '../components/UI/ErrorOverlay'


function RecentExpense() {

    const [error, setError] = useState()
    const expenseCtx = useContext(ExpenseContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getExpenses = async () => {
            setLoading(true)
            try {
                const expenses = await fetchExpenses()
                expenseCtx.setExpenses(expenses)
            }
            catch (error) {
                setError('Could not fetch expenses')
            }

            setLoading(false)


        }

        getExpenses()
        // console.log('recent ', fetchedExpenses)

    }, [])

    const errorHandler = () => {
        setError(null)
    }

    if (error && !loading) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (loading) {
        return <LoadingOverlay />
    }



    const recentExpenses = expenseCtx.expenses.filter((expense) => {

        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return expense.date > date7DaysAgo;

    })

    return (
        <ExpensesOutput expenses={recentExpenses} expensePeriod='Last 7 days' fallbackText='No Recent Expenses' />
    )
}

export default RecentExpense