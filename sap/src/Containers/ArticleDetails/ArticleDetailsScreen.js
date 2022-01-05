import React from 'react';
import {
    View,
    Text,
    ScrollView,
    ToastAndroid,
    ActivityIndicator,
    Linking,
    TouchableOpacity
} from 'react-native';

import Header from '../../Components/Header';

import styles from "./ArticleDetailsScreenStyles";
import { color, size, typography } from '../../theme';

import { getArticle, addBookMark, getBookmarked } from '../../Services/API/articles';

class ArticleDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.route.params.title,
            article: {},
            loading: true,
            bookmarked: this.props.route.params.bookmarked,
            flag: this.props.route.params.bookmarked
        };
    }

    componentDidMount() {
        if (this.state.flag) {
            getBookmarked(this.state.title).then((article) => {
                this.setState({ article, loading: false });
            }).catch((error) => {
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                this.setState({ loading: false });
            });
        } else {
            getArticle(this.state.title).then((article) => {
                this.setState({ article, loading: false });
            }).catch((error) => {
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                this.setState({ loading: false });
            });
        }

    }

    render() {
        return (
            <View style={styles.home}>
                <Header
                    route={{ name: 'article' }}
                    leftIcon={true}
                    onLeftPress={() => this.props.navigation.navigate('home')}
                    rightIcon={this.state.bookmarked ? "bookmarked" : "bookmark"}
                    onRightPress={() => {
                        if (this.state.flag) {
                            this.setState({ bookmarked: true });
                        } else {
                            addBookMark(this.state.title).then(() => {
                                this.setState({ bookmarked: true });
                                ToastAndroid.show('Bookmarked', ToastAndroid.SHORT);
                            }).catch((error) => {
                                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                            })
                        }

                    }}
                />
                {
                    this.state.loading && (
                        <ActivityIndicator size="large" color={color.primary} />
                    )
                }
                {this.state.article && (
                    <ScrollView style={styles.articleContainer}>
                        <Text style={styles.headingText}>
                            {this.state.article.title}
                        </Text>
                        <Text style={styles.articleInfo}>
                            {this.state.article.date}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(this.state.article.url);
                        }}>
                            <Text style={styles.link}>
                                Read Orignal
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.articleText}>
                            {this.state.article.content}
                        </Text>
                    </ScrollView>
                )}

            </View>
        );
    }
}

export default ArticleDetailsScreen;