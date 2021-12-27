import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'

export default function modalMessenge({ visibleModal, onRequestClose, TitleModal, TextButton, onPressButton, descriptionModal, invalidValueModal }) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visibleModal}
            onRequestClose={onRequestClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitleText}>{TitleModal}</Text>
                    <Text style={styles.textDescription}>{descriptionModal}</Text>
                    <Text style={styles.textDescription}>{invalidValueModal}</Text>
                    <TouchableOpacity
                        style={[styles.buttonConfirm]}
                        onPress={onPressButton}>
                        <Text style={styles.titleBtn}>{TextButton}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
    },
    modalView: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '70%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalTitleText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#005aa5',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textDescription: {
        color: '#005aa5',
        marginVertical: 20
    }
})
