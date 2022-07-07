import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { NewsDto } from '../../model/dto/News.dto'
import NewsItem from '../../components/ui/NewsItem/NewsItem'
import { getNews } from '../../api/news'
import { addInteraction as addInteractionAPI } from '../../api/interaction'
import { addInteraction } from '../../store/interactionsSlice'
import { StoreReducer } from '../../store/store'

function NewsFeed() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsDto[]>([])

  const dispatch = useDispatch()

  const interactions = useSelector(
    (state: StoreReducer) => state.interactions.interactions
  )

  const onViewRef = useRef((viewableItems) => {
    viewableItems.changed.forEach((visibleNewsArticle: any) => {
      const newsArticleId = visibleNewsArticle.item.id

      // Store interaction in backend
      const newInteraction = interactions[newsArticleId] == null
      if (newInteraction) {
        addInteractionAPI({ newsArticleId, clicked: false })
      }

      // Store interaction in redux store
      dispatch(
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
    // TODO: filter in Backend
    return news.items.filter((newsItem) => newsItem.image)
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
      <View style={{ flex: 1, alignItems: 'center' }}>
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
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
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
