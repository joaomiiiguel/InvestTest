import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TextMask } from 'react-native-masked-text'


export default function CardRescue({ NameInvestment, DescriptionInvestment, ValueInvestment, indicadorCaren, onPress  }) {
    return (
        <>{
            (indicadorCaren === 'N')
                ?
                <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
                    <View style={styles.titleCard}>
                        <Text style={styles.titleInvest}>{NameInvestment}</Text>
                        <TextMask
                            style={styles.titleInvest}
                            type={'money'}
                            value={ValueInvestment}
                        />
                    </View>
                    <Text>{DescriptionInvestment}</Text>
                </TouchableOpacity>
                :
                <View style={styles.cardContainerInative}>
                    <View style={styles.titleCard}>
                        <Text style={styles.titleInvest}>{NameInvestment}</Text>
                        <TextMask
                            style={styles.titleInvest}
                            type={'money'}
                            value={ValueInvestment}
                        />
                    </View>
                    <Text>{DescriptionInvestment}</Text>
                </View>
        }
            
        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 5,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 15,
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 1,
        elevation: 5
    },
    cardContainerInative:{
        marginHorizontal: 5,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 15,
        opacity: 0.5
    },
    titleCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleInvest: {
        fontWeight: 'bold'
    }
})
