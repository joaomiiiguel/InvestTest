import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextMask, TextInputMask } from 'react-native-masked-text'


export default function CardAction({ NomeAcao, saldoAcumulado, id, onChangeResgate, setValorInvalido, valorInvalido }) {
    const [valorResgate, setValorResgate] = useState(0)
    const [saldoValidoResgate, setSaldoValidoResgate] = useState(0)


    return (
        <View style={{ marginBottom: 15 }}>
            <View style={styles.RowTitle}>
                <Text style={styles.boldText}>Ação</Text>
                <Text style={styles.titleInvest}>{NomeAcao}</Text>
            </View>
            <View style={styles.RowTitle}>
                <Text style={styles.boldText}>Saldo Acumulado</Text>

                <TextMask
                    style={styles.titleInvest}
                    type={'money'}
                    value={saldoAcumulado}
                />
            </View>
            <View style={styles.ColumnTitle}>
                <Text style={styles.textSmall}>Valor a resgatar</Text>
                <TextInputMask
                    style={styles.boldText}
                    type={'money'}
                    value={valorResgate}
                    placeholder='R$0,00'
                    includeRawValueInChangeText={true}
                    onChangeText={(text, rawText) => {
                        setSaldoValidoResgate(rawText)
                        setValorResgate(rawText);
                        console.log(saldoAcumulado)
                        console.log(saldoValidoResgate)
                        onChangeResgate(rawText, id);
                    }}
                />

                {(saldoValidoResgate > saldoAcumulado) && <Text style={styles.msgAlert}>Valor não pode ser maior que <TextMask type={'money'} value={saldoAcumulado} /></Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    buttonConfirm: {
        width: '100%',
        backgroundColor: '#FFD700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 25,
        marginTop: 15
    },
    titleBtn: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#005aa5'
    }
})
