import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header, Icon, Text, ThemeProvider } from 'react-native-elements';
import Menu from './Menu';

export default function TopHeader() {
    return <Header leftComponent={<Menu/>}
            centerComponent={{ text: 'Hangout', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
}