import React, { Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
    getHighlightedParts,
    getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';

function HighlightPart({ children, isHighlighted }) {
    return (
        <Text style={isHighlighted ? styles.highlighted : styles.nonHighlighted}>
            {children}
        </Text>
    );
}

export function Highlight({ hit, attribute, separator = ', ' }) {
    const { value: attributeValue = '' } =
        getPropertyByPath(hit._highlightResult, attribute) || {};
    const parts = getHighlightedParts(attributeValue);

    return (
        <>
            {parts.map((part, partIndex) => {
                if (Array.isArray(part)) {
                    const isLastPart = partIndex === parts.length - 1;

                    return (
                        <Fragment key={partIndex}>
                            {part.map((subPart, subPartIndex) => (
                                <HighlightPart
                                    key={subPartIndex}
                                    isHighlighted={subPart.isHighlighted}
                                >
                                    {subPart.value}
                                </HighlightPart>
                            ))}

                            {!isLastPart && separator}
                        </Fragment>
                    );
                }

                return (
                    <HighlightPart key={partIndex} isHighlighted={part.isHighlighted}>
                        {part.value}
                    </HighlightPart>
                );
            })}
        </>
    );
}

const styles = StyleSheet.create({
    highlighted: {
        fontWeight: 'bold',
        backgroundColor: '#f5df4d',
        color: '#6f6106',
    },
    nonHighlighted: {
        fontWeight: 'normal',
        backgroundColor: 'transparent',
        color: 'black',
    },
});