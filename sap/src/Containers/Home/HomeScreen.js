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

import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

import styles from './HomeScreenStyles';
import { color, size, typography } from '../../theme';

import { getContribAnalysis } from '../../Services/API/analysis';
import { getArticles, reduceScore } from '../../Services/API/articles';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(108, 198, 68, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      lastDate: null,
      loading: false,
      showContrib: false,
      articles: [],
      bookmarkedArticles: [],
      flag: 1
    };
  }

  saveResponseToData(res) {
    const result = res.data.mainTemp;

    let data = [];
    let lastDate = null;

    for (let key in result) {
      let date = new Date(key);

      // Convert date into a string
      let dateString =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate();

      let count = result[key];

      // round off the count to 2 decimal
      count = Math.round(count * 10000) / 10000;

      lastDate = new Date();
      // set year to 2000
      lastDate.setFullYear(date.getFullYear() + 1);

      data.push({ date: dateString, count: count });
    }
    this.setState({ data: data, lastDate: lastDate, loading: false });
  }
  async componentDidMount() {
    // this.setState({ loading: true });
    // const res = await getContribAnalysis();
    // if (res) {
    //   this.saveResponseToData(res);
    // } else {
    //   ToastAndroid.show('Something Went Wrong :)', ToastAndroid.SHORT);
    //   this.setState({ loading: false });
    // }

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
        {this.state.showContrib && (
          <View style={styles.contribCont}>
            <Text style={styles.WorkoutHeadingText}>
              Workout Contribution Graph
            </Text>

            {this.state.loading && (
              <ActivityIndicator size="large" color={color.primary} />
            )}

            {this.state.data && (
              <ContributionGraph
                values={this.state.data}
                endDate={this.state.lastDate}
                numDays={91}
                width={screenWidth * 0.99}
                height={220}
                chartConfig={chartConfig}
                style={styles.graphStyles}
              />
            )}
          </View>
        )}


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {
              backgroundColor: this.state.flag === 1 ? color.primary : color.lightGrey
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
              backgroundColor: this.state.flag === 0 ? color.primary : color.lightGrey
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

        {(!this.state.loading && this.state.flag == 1) && (
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

export default HomeScreen;
