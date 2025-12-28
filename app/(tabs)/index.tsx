import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlogCard } from '@/src/components/BlogCard';
import { EmptyState } from '@/src/components/EmptyState';
import { useFetchBlogs } from '@/src/hooks/useFetchBlogs';
import { Colors } from '@/src/constants/colors';
import { Layout } from '@/src/constants/spacing';
import { Blog } from '@/src/types/blog';

export default function HomeScreen() {
  const { blogs, loading, error, refresh } = useFetchBlogs();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const renderItem = useCallback(({ item }: { item: Blog }) => (
    <BlogCard blog={item} />
  ), []);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      );
    }
    
    if (error) {
      return (
        <EmptyState
          title="오류가 발생했습니다"
          description={error}
          icon="alert-circle-outline"
        />
      );
    }
    
    return (
      <EmptyState
        title="블로그 글이 없습니다"
        description="새로운 글이 곧 업데이트됩니다"
        icon="document-text-outline"
      />
    );
  }, [loading, error]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.accent}
            colors={[Colors.accent]}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Layout.screenPadding,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
});
