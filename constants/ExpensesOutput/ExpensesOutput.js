import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../globalStyles'


const dummyExpenses = [
    { id: 'e1', title: 'shoes', amount: 59.99, date: new Date('2022-07-19') },
    { id: 'e2', title: 'books', amount: 19.99, date: new Date('2022-07-14') },
    { id: 'e3', title: 'glasses', amount: 100.59, date: new Date('2022-07-13') },
    { id: 'e4', title: 'laptop', amount: 1200, date: new Date('2022-06-30') },
    { id: 'e5', title: 'book', amount: 10.97, date: new Date('2022-06-29') },
    { id: 'e6', title: 'grocery', amount: 110.45, date: new Date('2022-06-28') },
    { id: 'e7', title: 'pizza', amount: 20.99, date: new Date('2022-05-19') },


]

function ExpensesOutput({ expenses, expensePeriod, fallbackText }) {

    let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
            {content}
        </View>
    )
}

export default ExpensesOutput


const styles = StyleSheet.create({

    container: {
        paddingTop: 24,
        paddingBottom: 0,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    },
    fallbackText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }

})