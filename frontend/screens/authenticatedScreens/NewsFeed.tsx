import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'

import { getNews } from '../../api/news'
import { NewsDto } from '../../model/dto/News.dto'
import NewsItem from '../../components/ui/NewsItem/NewsItem'

function NewsFeed() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsDto[]>([])

  async function fetchNews() {
    const news = await getNews({ limit: 5, offset: 3 })
    // TODO: filter in Backend
    return news.items.filter((newsItem) => newsItem.image)
  }

  useEffect(() => {
    async function fetchInitialNews() {
      const newsItems = await fetchNews()
      setNewsItems(newsItems)
      setIsInitialLoading(false)
    }

    fetchInitialNews()
  }, [])

  if (isInitialLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  function renderNewsItem({ item }: { item: NewsDto }) {
    return <NewsItem {...item} />
  }

  async function onRefresh() {
    setIsRefreshing(true)
    const newsItems = await fetchNews()
    setNewsItems(newsItems)
    setIsRefreshing(false)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsItems}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>
  )
}

export default NewsFeed

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
