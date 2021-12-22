import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TextMask, TextInputMask } from 'react-native-masked-text'
import CardAction from '../components/CardAction'



export default function Details() {
    const route = useRoute();
    const investment = route.params.investment
    const [valueRescue, setValueRescue] = useState(new Map)
    const [valorInvalido, setValorInvalido] = useState(false)

    function getValuesToRescue(){
        if (!valueRescue.size){
            alert('Map vazio')
        }if(valorInvalido === true){
            alert('Valor Inválido')
        }if(valorInvalido === false && valueRescue.size){
            alert('Resgate Efetuado')
        }
        console.log(valueRescue)
    }

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
                    <CardAction
                        id={action.id}
                        NomeAcao={action.nome}
                        saldoAcumulado={(investment.saldoTotal * action.percentual) / 100}
                        onChangeResgate={(rawText, id) => { 
                            if(rawText > (investment.saldoTotal * action.percentual) / 100){
                                setValorInvalido(true)
                            }else{
                                setValorInvalido(false)
                                setValueRescue(new Map(valueRescue.set(id, rawText))) }
                            }
                        }
                        valorInvalido={valorInvalido}
                        setValorInvalido={setValorInvalido}
                    />
                )}
            />
            <TouchableOpacity style={styles.buttonConfirm} onPress={() => getValuesToRescue()} >
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
