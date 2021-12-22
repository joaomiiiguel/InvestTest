import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TextMask, TextInputMask } from 'react-native-masked-text'



export default function Details() {
    const route = useRoute();
    const investment = route.params.investment
    const [valueRescue, setValueRescue] = useState([])

    return (
        <View style={styles.containerDetails}>
            <Text style={styles.titleCard}>DADOS DO INVESTIMENTO</Text>
            <View style={styles.RowTitle}>
                <Text style={styles.boldText}>Nome</Text>
                <Text style={styles.titleInvest}>{investment.nome}</Text>
            </View>

            <View style={styles.RowTitle}>
                <Text style={styles.boldText}>Saldo Total Disponível</Text>
                <TextMask
                    style={styles.titleInvest}
                    type={'money'}
                    value={investment.saldoTotal}
                />
            </View>

            <Text style={styles.titleCard}>RESGATE DO SEU JEITO</Text>

            <FlatList
                data={investment.acoes}
                keyExtractor={action => String(action.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: action }) => (
                    <View style={{ marginBottom: 15 }}>
                        <View style={styles.RowTitle}>
                            <Text style={styles.boldText}>Ação</Text>
                            <Text style={styles.titleInvest}>{action.nome}</Text>
                        </View>
                        <View style={styles.RowTitle}>
                            <Text style={styles.boldText}>Saldo Acumulado</Text>

                            <TextMask
                                style={styles.titleInvest}
                                type={'money'}
                                value={(investment.saldoTotal * action.percentual) / 100}
                            />
                        </View>
                        <View style={styles.ColumnTitle}>
                            <Text style={styles.textSmall}>Valor a resgatar</Text>
                            <TextInputMask
                                style={styles.boldText}
                                type={'money'}
                                value={valueRescue}
                                onChangeText={valueRescue => setValueRescue(valueRescue)}
                            />
                            {console.log((investment.saldoTotal * action.percentual) / 100) > console.log(valueRescue)
                                ?
                                console.log('dal')
                                :
                                console.log('erro')
                                // <Text style={styles.msgAlert}>Valor não pode ser maior que <TextMask type={'money'} value={(investment.saldoTotal * action.percentual) / 100} /></Text>
                            }
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.buttonConfirm}>
                <Text style={styles.titleBtn}>CONFIRMAR RESGATE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDetails: {
        flex: 1,
        backgroundColor: '#eee',
        paddingHorizontal: 25
    },
    RowTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 1
    },
    ColumnTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 1
    },
    titleCard: {
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#7f7f7f'
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000'
    },
    titleInvest: {
        fontWeight: 'bold',
        color: '#7f7f7f'
    },
    textSmall: {
        fontSize: 12,
        color: '#7f7f7f'
    },
    msgAlert: {
        fontSize: 12,
        color: '#fc8080',
        fontWeight: 'bold'
    },
    buttonConfirm:{
        width: '100%',
        backgroundColor: '#FFD700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 25,
        marginTop: 15
    },
    titleBtn:{
        fontWeight: 'bold',
        fontSize: 15,
        color: '#005aa5'
    }
})
