import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { useLayoutEffect } from 'react'
import { GlobalStyles } from '../constants/globalStyles'
import IconBtn from '../components/UI/IconBtn'
import Button from '../components/UI/Button'
import { ExpenseContext } from '../store/expense-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'



function ManageExpense({ route, navigation }) {

    const expenseCtx = useContext(ExpenseContext)

    const expenseId = route.params?.expenseId

    const isEditing = !!expenseId

    const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === expenseId)
    const [error, setError] = useState()
    const [submitting, setSubmit] = useState(false)
    useLayoutEffect(() => {

        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : ' Add Expense'
        })

    }, [isEditing, navigation])

    const deleteExpenseHandler = () => {

        try {
            setSubmit(true)
            deleteExpense(expenseId)  // this is the axios function 
            expenseCtx.deleteExpense(expenseId)
            setSubmit(false)
            navigation.goBack();

        }
        catch (error) {
            setError('Could not delete the Expense!')
            setSubmit(false)
        }



    }

    const errorHandler = () => {
        setError(null)
    }

    if (error && !submitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    const cancelHandler = () => {

        navigation.goBack();
    }



    return (
        <View style={styles.continer}>
            <ExpenseForm onCancle={cancelHandler} navigation={navigation} expenseCtx={expenseCtx} isEditing={isEditing} expenseId={expenseId} defaultValues={selectedExpense} />

            <View style={styles.deleteContainer}>
                {isEditing && <IconBtn icon='trash' color={GlobalStyles.colors.error500} size={36} onTap={deleteExpenseHandler} />}
            </View>
        </View>
    )
}

export default ManageExpense


const styles = StyleSheet.create({
    continer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,

    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})