import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TextMask } from 'react-native-masked-text'
import CardAction from '../components/CardAction'
import ModalMessenge from '../components/Modal'


export default function Details({ navigation }) {
    const route = useRoute();
    const investment = route.params.investment
    const [valueRescue, setValueRescue] = useState(new Map)
    const [valorInvalido, setValorInvalido] = useState(false)
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const [modalVisibleVazio, setModalVisibleVazio] = useState(false);
    const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
    const [listaTotalResgate, setListaTotalResgate] = useState([])

    const [saldoTotal, setSaldoTotal] = useState(0)
    
    //Função para verificar as regras do resgate
    function getValuesToRescue() {
        //Verifica se nenhum input está vazio
        if (!valueRescue.size) {
            setModalVisibleVazio(true)
        }
        //Verifica se algum valor preenchido está inválido
        if (valorInvalido === true) {
            setModalVisibleError(true)
        }
        //Realiza o resgate
        if (valorInvalido === false && valueRescue.size) {
            setModalVisibleConfirm(true)
        }
    }
    

    

    function somaValores(){
        const result = listaTotalResgate.reduce((acc, numero) => acc + numero, 0);
        setSaldoTotal(result)
    }
    useEffect(() => {
        somaValores()
    })
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
                            if (rawText > (investment.saldoTotal * action.percentual) / 100) {
                                setValorInvalido(true)
                            } else {
                                setValorInvalido(false)
                                setValueRescue(new Map(valueRescue.set(id, rawText)))
                            }
                        }
                        }

                        onSubmitValueResgate={(valorResgate) => setListaTotalResgate(state => [...state, valorResgate])}
                        valorInvalido={valorInvalido}
                        setValorInvalido={setValorInvalido}
                    />
                )}
            />
            <View style={[styles.RowTitle, { marginTop: 20 }]}>
                <Text style={styles.boldText}>Saldo total a resgatar</Text>
                <TextMask
                    style={styles.titleInvest}
                    type={'money'}
                    value={saldoTotal}
                />
            </View>

            <TouchableOpacity style={styles.buttonConfirm} onPress={() => getValuesToRescue()} >
                <Text style={styles.titleBtn}>CONFIRMAR RESGATE</Text>
            </TouchableOpacity>


            <ModalMessenge
                TitleModal={'DADOS INVÁLIDOS'}
                TextButton={'CORRIGIR'}
                descriptionModal={'Você preencheu um ou mais campos com valor acima do permitido'}
                visibleModal={modalVisibleError}
                onRequestClose={() => setModalVisibleError(!modalVisibleError)}
                onPressButton={() => setModalVisibleError(!modalVisibleError)}
            />

            <ModalMessenge
                TitleModal={'VALORES VAZIOS'}
                TextButton={'VOLTAR'}
                descriptionModal={'Preencha ao menos um dos campos de Valor a Resgatar para realizar o resgate'}
                visibleModal={modalVisibleVazio}
                onRequestClose={() => setModalVisibleVazio(!modalVisibleVazio)}
                onPressButton={() => setModalVisibleVazio(!modalVisibleVazio)}
            />
            <ModalMessenge
                TitleModal={'RESGATE EFETUADO!'}
                TextButton={'NOVO RESGATE'}
                descriptionModal={'O valo solicitado estará em sua conta em até 5 dias úteis!'}
                visibleModal={modalVisibleConfirm}
                onRequestClose={() => setModalVisibleConfirm(!modalVisibleConfirm)}
                onPressButton={() => { setModalVisibleConfirm(!modalVisibleConfirm), navigation.goBack() }}
            />
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
    },
})
