import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import CardRescue from '../components/CardRescue';
import api from '../services/api'


export default function Home() {
    const [dataListInvestments, setDataListInvestments] = useState([]);

    async function getApiGit(){
        await api.get('/7b2dfe42-37a3-4094-b7ce-8ee4f8012f30')
        .then(function(response){
            setDataListInvestments(response.data.response.data.listaInvestimentos)
        })
        .catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getApiGit()
    }, [])

    console.log(Math.floor(Math.random()*100)+1)

    return (
        <View style={styles.containerHome}>
            <Text>Miguel</Text>
            <FlatList
                data={dataListInvestments}
                showsVerticalScrollIndicator={false}
                keyExtractor={investment => String(Math.floor(Math.random()*100)+1)}
                renderItem={({ item: investment }) => (
                    <CardRescue
                        NameInvestment={investment.nome}
                        ValueInvestment={investment.saldoTotal}
                        DescriptionInvestment={investment.objetivo}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerHome:{
        flex: 1,
        backgroundColor: '#000',
        paddingTop: StatusBar.currentHeight + 20
    }
})
