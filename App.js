import React, { useRef } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, Configure, } from 'react-instantsearch-core';
import { Highlight } from './src/highlight';
import { SearchBox } from './src/searchbox';
import { InfiniteHits } from './src/infinitehits';

const searchClient = algoliasearch('yourapplication_id', 'your_searchonlyapikey');

export default function App() {
  const listRef = useRef(null);

  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="products_1">

          <Configure highlightPreTag="<mark>" highlightPostTag="</mark>" />
          <SearchBox onChange={scrollToTop} />
          <InfiniteHits ref={listRef} hitComponent={Hit} />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );

}
function Hit({ hit }) {
  return (
    <Text>
      <Highlight hit={hit} attribute="name" />
    </Text>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
});