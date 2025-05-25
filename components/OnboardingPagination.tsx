import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface OnboardingPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function OnboardingPagination({ currentPage, totalPages }: OnboardingPaginationProps) {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === currentPage && styles.activePaginationDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: colors.primary,
  },
});