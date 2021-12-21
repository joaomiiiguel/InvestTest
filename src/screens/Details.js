import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TextMask } from 'react-native-masked-text'

export default function Details() {
    const route = useRoute();
    const investment = route.params.investment

    console.log(investment)
    return (
        <View>
            <Text>DADOS DO INVESTIMENTO</Text>
            <Text>{investment.nome}</Text>
            <TextMask
                style={styles.titleInvest}
                type={'money'}
                value={investment.saldoTotal}
            />
            <Text>RESGATE DO SEU JEITO</Text>
            <FlatList
                data={investment.acoes}
                keyExtractor={action => String(action.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: action }) => (
                    <Text>{action.nome}</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
