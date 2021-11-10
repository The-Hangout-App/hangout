import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header, Icon, Text, ThemeProvider } from 'react-native-elements';

export default function Menu() {
    return <Icon name="menu" iconStyle={styles.ico}/>
}

const styles = StyleSheet.create({
    ico: {
        color: "#fff"
    }
})