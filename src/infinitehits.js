import React, { forwardRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-core';

const InfiniteHits = forwardRef(({ hitComponent: Hit, ...props }, ref) => {
    const { items, isLastPage, showMore } = useInfiniteHits({
        ...props,
        escapeHTML: false,
    });

    return (
        <FlatList
            ref={ref}
            data={items}
            keyExtractor={(item) => item.objectID}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => {
                if (!isLastPage) {
                    showMore();
                }
            }}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Hit hit={item} />
                </View>
            )}
        />
    );
});

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 18,
    },
});

export { InfiniteHits };
