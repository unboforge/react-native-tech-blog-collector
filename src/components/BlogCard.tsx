import React from 'react';
import { View, Text, StyleSheet, Pressable, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Blog } from '../types/blog';
import { useBookmark } from '../hooks/useBookmark';
import { openUrl } from '../utils/urlOpener';
import { formatDate } from '../utils/dateFormatter';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Layout } from '../constants/spacing';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const { bookmarked, toggleBookmark } = useBookmark(blog);

  const handlePress = () => {
    openUrl(blog.url);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${blog.title}\n${blog.url}`,
        url: blog.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Pressable 
      style={styles.card}
      onPress={handlePress}
      android_ripple={{ color: Colors.border }}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {blog.title}
        </Text>
        
        <Text style={styles.company}>{blog.company}</Text>
        
        <Text style={styles.date}>{formatDate(blog.publishedAt)}</Text>
        
        <View style={styles.actions}>
          <Pressable 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleBookmark();
            }}
          >
            <Ionicons 
              name={bookmarked ? 'bookmark' : 'bookmark-outline'} 
              size={20} 
              color={Colors.accent} 
            />
            <Text style={styles.actionText}>북마크</Text>
          </Pressable>
          
          <Pressable 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              handleShare();
            }}
          >
            <Ionicons 
              name={Platform.OS === 'ios' ? 'share-outline' : 'share-social-outline'} 
              size={20} 
              color={Colors.accent} 
            />
            <Text style={styles.actionText}>공유</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Layout.cardBorderRadius,
    padding: Layout.cardPadding,
    marginBottom: Layout.cardGap,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  content: {
    gap: 12,
  },
  title: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight,
    lineHeight: Typography.title.lineHeight,
    color: Colors.header.text,
  },
  company: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.body.fontWeight,
    lineHeight: Typography.body.lineHeight,
    color: Colors.text.secondary,
  },
  date: {
    fontSize: Typography.caption.fontSize,
    fontWeight: Typography.caption.fontWeight,
    lineHeight: Typography.caption.lineHeight,
    color: Colors.text.tertiary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Layout.buttonBorderRadius,
  },
  actionText: {
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.body.fontWeight,
    color: Colors.accent,
  },
});




