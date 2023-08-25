import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native'
import { GlobalStyles } from '../../constants/globalStyles'
import Input from './Input'
import Button from '../UI/Button'
import { storeExpense } from '../../util/http'
import { updateExpense } from '../../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'



function ExpenseForm({ onCancle, expenseCtx, expenseId, isEditing, navigation, defaultValues }) {

    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [inputValue, setInputValue] = useState({

        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
        title: defaultValues ? defaultValues.title : ''

    })

    const inputChangeHandler = (inputIdentifier, enteredValue) => {

        setInputValue((curInput) => {
            return { ...curInput, [inputIdentifier]: enteredValue }
        })
    }

    const confirmHandler = async () => {

        const expenseData = {
            amount: + inputValue.amount,
            date: new Date(inputValue.date),
            title: inputValue.title
        }

        const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateValid = expenseData.date.toString() !== 'Invalid Date'
        const titleValid = expenseData.title.trim().length > 0

        if (!amountValid || !dateValid || !titleValid) {
            Alert.alert('Invalid Input', 'Please check your input')
            return
        }

        try {

            setLoading(true)


            if (isEditing) {

                expenseCtx.updateExpense(expenseId, expenseData)
                const response = await updateExpense(expenseId, expenseData)

            }
            else {

                const id = await storeExpense(expenseData)
                expenseCtx.addExpense({ ...expenseData, id: id })

            }
            setLoading(false)
        }
        catch (error) {

            setError('Could not save data!')
            setLoading(false)
        }

        navigation.goBack();
    }

    const errorHandler = () => {
        setError(null)
    }

    if (error && !loading) {
        <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (loading) {
        return <LoadingOverlay />
    }


    return (
        <View style={styles.form}>
            <Text style={styles.title}>Add a new Expense</Text>
            <View style={styles.rowInput}>
                <Input style={{ flex: 1 }} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: (enteredVal) => { inputChangeHandler('amount', enteredVal) },
                    value: inputValue.amount


                }} />
                <Input style={{ flex: 1 }} label='Date' textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    keyboardType: 'decimal-pad',
                    maxLength: 10,
                    onChangeText: (enteredVal) => { inputChangeHandler('date', enteredVal) },
                    value: inputValue.date


                }} />
            </View>
            <Input label='Description' textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: (enteredVal) => { inputChangeHandler('title', enteredVal) },
                value: inputValue.title

            }} />
            <View style={styles.btnContainer}>
                <Button style={styles.btnStyle} mode='flat' onPress={onCancle}>Cancel</Button>
                <Button style={styles.btnStyle} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
        </View>

    )
}

export default ExpenseForm

const styles = StyleSheet.create({

    rowInput: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    form: {
        marginTop: 60
    },
    title: {
        color: GlobalStyles.colors.primary100,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,

    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    btnStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    }

})