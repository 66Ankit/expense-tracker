import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, Pressable, StyleSheet } from 'react-native'

function IconBtn({ icon, size, color, onTap }) {
    return (
        <Pressable onPress={onTap} style={({ pressed }) => pressed && styles.pressedBtn}>
            <View style={styles.btnContainer}>
                <Ionicons name={icon} color={color} size={size} />
            </View>
        </Pressable>
    )
}

export default IconBtn


const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2,

    },
    pressedBtn: {
        opacity: 0.75,

    }
})
