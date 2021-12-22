import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import CardRescue from '../components/CardRescue';
import api from '../services/api'
import uuid from 'react-native-uuid';


export default function Home({ navigation }) {
    const [dataListInvestments, setDataListInvestments] = useState([]);
    const [loading, setLoading] = useState(true)

    async function getApiGit() {
        await api.get('/7b2dfe42-37a3-4094-b7ce-8ee4f8012f30')
            .then(function (response) {
                setDataListInvestments(response.data.response.data.listaInvestimentos)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        getApiGit()
        setLoading(false)
    }, [])

    function ListInvestments() {
        return (
            <FlatList
                style={styles.listInvest}
                data={dataListInvestments}
                showsVerticalScrollIndicator={false}
                keyExtractor={investment => String(uuid.v4())}
                renderItem={({ item: investment }) => (
                    <CardRescue
                        NameInvestment={investment.nome}
                        ValueInvestment={investment.saldoTotal}
                        DescriptionInvestment={investment.objetivo}
                        indicadorCaren={investment.indicadorCarencia}
                        onPress={() => navigation.push('Details', { investment })}
                    />
                )}
            />
        )
    }

    function LoadingPage() {
        return (
            <View >
                <ActivityIndicator color="#005aa5" size="large"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerList}>
                <Text style={styles.titleHeader}>INVESTIMENTOS</Text>
                <Text style={styles.titleHeader}>R$</Text>
            </View>

            { loading ? <LoadingPage /> : <ListInvestments /> }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 25
    },
    listInvest: {
        width: '100%'
    },
    headerList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginBottom: 20
    },
    titleHeader: {
        fontWeight: 'bold',
        color: '#666'
    }
})
