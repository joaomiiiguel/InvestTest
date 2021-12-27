import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TextMask } from 'react-native-masked-text'
import CardAction from '../components/CardAction'
import ModalMessenge from '../components/Modal'


export default function Details({ navigation }) {
    const route = useRoute();
    const investment = route.params.investment
    const [valueRescue, setValueRescue] = useState(new Map())
    const [valorInvalido, setValorInvalido] = useState(new Map())
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const [modalVisibleVazio, setModalVisibleVazio] = useState(false);
    const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
    const [listaTotalResgate, setListaTotalResgate] = useState([])
    const [saldoTotal, setSaldoTotal] = useState(0)

    const getInvalidInvestment = () => {
        const result = []

        let stringResult = '\n'; 

        const invalidValues = Array.from(valorInvalido.keys()); 
        for (let index = 0; index < invalidValues.length; index++) {
            const id = invalidValues[index];
            const acoes = Array.from(investment.acoes); 
            if (acoes) {
                const [ acao ] = acoes.filter((element) => element.id === id); 
                const { nome } = acao; 
                
                if (nome && valorInvalido.get(id)) {
                    const value = (investment.saldoTotal * acao.percentual) / 100; 
                    const obj = { nome, value }
                    const str = `${nome}: Valor máximo de R$${value} \n \n`
                    stringResult = stringResult.concat(str); 
                    result.push(obj);
                }
            }
        }
        return stringResult; 
    }; 
    //Função para verificar as regras do resgate
    function getValuesToRescue() {
        
        console.log(valorInvalido); 
     
        //Verifica se nenhum input está vazio
        if (!valueRescue.size) {
            setModalVisibleVazio(true)
        }
        //Verifica se algum valor preenchido está inválido
        if (Array.from(valorInvalido.values()).some(value => value === true) ) {
            setModalVisibleError(true)
        }
        //Realiza o resgate
        if (Array.from(valorInvalido.values()).every(value => value === false) && valueRescue.size) {
            setModalVisibleConfirm(true)
        }
    }
    

   
    function somaValores(){

        
        if (valueRescue.size !== 0) {
            const adder = (previousValue, currentValue) => previousValue + currentValue;
            const sum = Array.from(valueRescue.values()).reduce(adder); 
            setSaldoTotal(sum); 
        }
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
                        onSubmitValueResgate={(rawText, id) => {

                            const invalido = rawText > (investment.saldoTotal * action.percentual) / 100; 
                            setValueRescue(new Map(valueRescue.set(id, rawText)))
                            setValorInvalido(new Map(valorInvalido.set(id, invalido))); 

                        }}
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
                descriptionModal={`Você preencheu um ou mais campos com valor acima do permitido, `}
                invalidValueModal={`${getInvalidInvestment()}`}
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
