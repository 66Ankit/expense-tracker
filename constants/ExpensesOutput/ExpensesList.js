import React from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import ExpenseItem from './ExpenseItem'


const renderExpenseItem = (itemData) => {
    return <ExpenseItem id={itemData.item.id} description={itemData.item.title} amount={itemData.item.amount} date={itemData.item.date} />
}


function ExpensesList({ expenses }) {
    return (
        <FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={renderExpenseItem} />
    )
}

export default ExpensesList


const styles = StyleSheet.create({

})