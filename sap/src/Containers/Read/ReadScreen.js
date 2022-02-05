import React from 'react';
import {
    View,
    Text,
    ScrollView,
    ToastAndroid,
    ActivityIndicator,
    Image,
    TouchableOpacity
} from 'react-native';

import styles from './ReadScreenStyles';
import { color, size, typography } from '../../theme';

import { getArticles, reduceScore } from '../../Services/API/articles';

class ReadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            articles: [],
            bookmarkedArticles: [],
            flag: 1
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        const res2 = await getArticles();
        if (res2) {
            this.setState({ articles: res2.data, loading: false, bookmarkedArticles: res2.bookmarked });
        } else {
            ToastAndroid.show('Something Went Wrong :D', ToastAndroid.SHORT);
            this.setState({ loading: false });
        }

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.refreshScreen();
        });

    }

    componentWillUnmount() {
        try {
            this._unsubscribe();
        } catch (err) { }
    }

    async refreshScreen() {
        this.setState({ loading: true });
        const res2 = await getArticles();
        if (res2) {
            this.setState({ articles: res2.data, loading: false, bookmarkedArticles: res2.bookmarked });
        } else {
            ToastAndroid.show('Something Went Wrong :D', ToastAndroid.SHORT);
            this.setState({ loading: false });
        }
    }


    render() {
        return (
            <ScrollView style={styles.home}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, {
                            borderColor: this.state.flag === 1 ? color.primary : color.lightGrey
                        }]}
                        onPress={() => {
                            this.setState({ flag: 1 });
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Latest articles
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, {
                            borderColor: this.state.flag === 0 ? color.primary : color.lightGrey
                        }]}
                        onPress={() => {
                            this.setState({ flag: 0 });
                        }}
                    >
                        <Text style={styles.buttonText}>
                            Bookmarked articles
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainContainerArticles}>
                    {
                        this.state.loading && (
                            <ActivityIndicator size="large" color={color.primary} />
                        )
                    }
                    {(!this.state.loading && this.state.flag == 1) && (

                        this.state.articles.map((article, index) => {
                            return (
                                <TouchableOpacity style={styles.articlesContainer} key={index} onPress={() => this.props.navigation.navigate("ArticleDetails", { title: article.title, bookmarked: false })}>
                                    {article.img && (<Image source={{ uri: article.img }} style={styles.articleImage} />)}
                                    <View style={styles.textContainer}>
                                        <Text style={styles.articlesTitle}>
                                            {article.title}
                                        </Text>
                                        <Text style={styles.articlesDesc}>
                                            {
                                                // show 100 words of description
                                                article.description.split(' ').slice(0, 10).join(' ')
                                            }...
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })

                    )
                    }


                    {(!this.state.loading && this.state.flag == 0) && (
                        <View style={{ marginBottom: size.scale(70) }}>
                            {
                                this.state.bookmarkedArticles.map((article, index) => {
                                    return (
                                        <TouchableOpacity style={styles.articlesContainer} key={index} onPress={() => this.props.navigation.navigate("ArticleDetails", { title: article.title, bookmarked: true })}>
                                            {article.img && (<Image source={{ uri: article.img }} style={styles.articleImage} />)}
                                            <View style={styles.textContainer}>
                                                <Text style={styles.articlesTitle}>
                                                    {article.title}
                                                </Text>
                                                <Text style={styles.articlesDesc}>
                                                    {
                                                        // show 100 words of description
                                                        article.description.split(' ').slice(0, 10).join(' ')
                                                    }...
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                        </View>
                    )
                    }


                </View>

                {(!this.state.loading && this.state.flag == 1 && this.state.articles.length > 0) && (
                    <View style={styles.nextPageContainer}>
                        <TouchableOpacity style={styles.nextPageButton} onPress={() => {
                            reduceScore().then(res => {
                                if (res) {
                                    this.refreshScreen();
                                } else {
                                    ToastAndroid.show('Something Went Wrong :D', ToastAndroid.SHORT);
                                }
                            }).catch(err => {
                                ToastAndroid.show('Something Went Wrong :D', ToastAndroid.SHORT);
                            });
                        }}>
                            <Text style={styles.nextPageText}>more articles....</Text>
                        </TouchableOpacity>
                    </View>)
                }


            </ScrollView >
        );
    }
}

export default ReadScreen;
