import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import axios from 'axios';
import FooterMenu from '../components/Menus/FooterMenu';
import moment from 'moment';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us&category=health&page=${page}&apiKey=36a961dea43e44739b77c199499d3b9b`
                );
                setArticles(prevArticles => [...prevArticles, ...response.data.articles]);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [page]);

    const loadMoreArticles = () => {
        setPage(page => page + 1);
    };

    const handleArticlePress = (articleUrl) => {
        setSelectedArticle(articleUrl);
    };

    const handleBackPress = () => {
        setSelectedArticle(null);
    };

    const filteredArticles = articles.filter(article => {
        // Check if the article title or content is not equal to "[Removed]"
        return article.title !== "[Removed]" && article.content !== "[Removed]";
    });

    const renderWebView = () => {
        if (!selectedArticle || !selectedArticle.startsWith('http')) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Invalid URL</Text>
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.webViewHeader}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <WebView
                    source={{ uri: selectedArticle }}
                    style={{ flex: 1 }}
                    originWhitelist={['*']}
                    onNavigationStateChange={(event) => {
                        if (event.url !== selectedArticle) {
                            Linking.openURL(event.url);
                        }
                    }}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {!selectedArticle ? (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    onScroll={({ nativeEvent }) => {
                        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                        if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
                            loadMoreArticles();
                        }
                    }}
                    scrollEventThrottle={400}
                >
                    {filteredArticles.map((article, index) => (
                        <TouchableOpacity key={index} style={styles.card} onPress={() => handleArticlePress(article.url)}>
                            <Image
                                source={{ uri: article.urlToImage }}
                                style={styles.image}
                            />
                            <View style={styles.cardContent}>
                                <Text style={styles.title}>{article.title}</Text>
                                <Text style={styles.time}>{moment(article.publishedAt).format('MMM Do YYYY, h:mm:ss a')}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                renderWebView()
            )}
            <View style={styles.footerWrapper}>
                <FooterMenu />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        marginTop: 40,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        overflow: 'hidden',
        width: '100%', //
    },
    image: {
        height: 150,
        width: '100%',
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    time: {
        fontSize: 12,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    webViewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        elevation: 4,
    },
    footerWrapper: {
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },
});

export default News;
