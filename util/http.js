import axios from "axios"

const BACKEND_URI = 'https://react-native-expense-tra-9e02b-default-rtdb.firebaseio.com'

export const storeExpense = async (expenseData) => {
    const response = await axios.post(BACKEND_URI + '/expenses.json', expenseData)
    const id = response.data.name
    return id
}


export const fetchExpenses = async () => {
    const response = await axios.get(BACKEND_URI + '/expenses.json')

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            title: response.data[key].title
        };
        expenses.push(expenseObj)
    }

    // console.log(expenses)

    return expenses

}


export const updateExpense = async (id, expenseData) => {

    return await axios.put(BACKEND_URI + `/expenses/${id}.json`, expenseData)

}

export const deleteExpense = async (id) => {
    axios.delete(BACKEND_URI + `/expenses/${id}.json`)
}