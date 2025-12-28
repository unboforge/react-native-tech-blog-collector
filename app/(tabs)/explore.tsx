import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlogCard } from '@/src/components/BlogCard';
import { EmptyState } from '@/src/components/EmptyState';
import { useLocalBookmarks } from '@/src/hooks/useLocalBookmarks';
import { Colors } from '@/src/constants/colors';
import { Layout } from '@/src/constants/spacing';
import { Bookmark } from '@/src/types/blog';

export default function BookmarksScreen() {
  const { bookmarks, loading } = useLocalBookmarks();

  const renderItem = ({ item }: { item: Bookmark }) => (
    <BlogCard blog={item.blog} />
  );

  const renderEmpty = () => (
    <EmptyState
      title="북마크한 글이 없습니다"
      description="관심있는 글을 북마크해보세요"
      icon="bookmark-outline"
    />
  );

  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={bookmarks.length === 0 ? styles.emptyContent : styles.listContent}
        ListEmptyComponent={renderEmpty}
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
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
  },
});
