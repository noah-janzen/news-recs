import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'

import { NewsDto } from '../../model/dto/News.dto'
import NewsItem from '../../components/ui/NewsItem/NewsItem'
import { getNews } from '../../api/news'
import { addInteraction as addInteractionAPI } from '../../api/interaction'
import { addInteraction } from '../../store/interactionsSlice'
import { store } from '../../store/store'

function NewsFeed() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsDto[]>([])

  const onViewRef = useRef((viewableItems: any) => {
    viewableItems.changed.forEach((visibleNewsArticle: any) => {
      const newsArticleId = visibleNewsArticle.item.id
      const interactions = store.getState().interactions.interactions

      const newInteraction = interactions[newsArticleId] == null
      if (!newInteraction) return

      // Store new interaction in backend
      addInteractionAPI({ newsArticleId, clicked: false })

      // Store interaction in redux store
      store.dispatch(
        addInteraction({
          newsArticleId: newsArticleId,
          clicked: false,
        })
      )
    })
  })
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 33 })

  async function fetchNews() {
    const news = await getNews({ limit: 5, offset: 0 })
    return news.items
  }

  async function loadAdditionalNewsItems() {
    const additionalNewsItems = await fetchNews()
    // Filter duplicate fetched news
    const uniqueAdditionalNewsItems = additionalNewsItems.filter(
      (item) => newsItems.findIndex((existing) => existing.id === item.id) < 0
    )
    setNewsItems((currentNewsItems) => [
      ...currentNewsItems,
      ...uniqueAdditionalNewsItems,
    ])
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
      <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
        <ActivityIndicator />
      </View>
    )
  }

  function renderNewsItem(item: NewsDto, isLastItem: boolean) {
    return <NewsItem {...item} isLastItem={isLastItem} />
  }

  async function onRefresh() {
    setIsRefreshing(true)
    const newsItems = await fetchNews()
    setNewsItems(newsItems)
    setIsRefreshing(false)
  }

  function BottomLoadingIndicator() {
    return (
      <View style={{ alignItems: 'center', marginTop: 18, marginBottom: 30 }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsItems}
        renderItem={({ item, index }: { item: NewsDto; index: number }) =>
          renderNewsItem(item, index === newsItems.length - 1)
        }
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReached={loadAdditionalNewsItems}
        onEndReachedThreshold={0.1}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        ListFooterComponent={<BottomLoadingIndicator />}
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
