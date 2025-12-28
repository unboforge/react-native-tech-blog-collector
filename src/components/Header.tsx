import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Layout } from '../constants/spacing';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.header.background,
    height: Layout.headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.card,
    paddingTop: 16,
    paddingBottom: 17,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: Typography.header.fontSize,
    fontWeight: Typography.header.fontWeight,
    lineHeight: Typography.header.lineHeight,
    color: Colors.header.text,
    textAlign: 'center',
  },
});




