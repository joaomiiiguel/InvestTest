import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function CardRescue({ NameInvestment, DescriptionInvestment, ValueInvestment }) {
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <View style={styles.titleCard}>
                <Text style={styles.titleInvest}>{NameInvestment}</Text>
                <Text style={styles.titleInvest}>{ValueInvestment}</Text>
            </View>
            <Text>{DescriptionInvestment}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 15
    },
    titleCard:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleInvest:{
        fontWeight: 'bold'
    }
})
