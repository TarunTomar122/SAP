import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './GoalDetailScreenStyles';
import { color, colorLight, size, typography } from '../../theme';

import Header from '../../Components/Header';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import Board, { Repository } from "react-native-dnd-board";

class GoalDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: true,
            goal: this.props.route.params.goal,
            data: [
                {
                    id: 1,
                    name: this.props.route.params.goal.title,
                    rows: [
                        {
                            id: '1',
                            title: 'Code for 2 hours in chokha bazar',
                            completed: false,
                            index: 0,
                        },
                        {
                            id: '2',
                            title: 'Eat Dinner and walk',
                            completed: false,
                            index: 1,
                        },
                        {
                            id: '3',
                            title: 'Again spend 2 hours in chokha bazar coding',
                            completed: true,
                            index: 2,
                        }
                    ]
                }
            ],
            repository: undefined,
            loading: true,
        };
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.refreshScreen();
        });
        this.setState({
            repository: new Repository(this.state.data),
            loading: false
        })
    }

    componentWillUnmount() {
        try {
            this._unsubscribe();
        } catch (err) { }
    }

    async refreshScreen() { }

    async update(data) {

    }

    renderColumnWrapper({ item, columnComponent, layoutProps }) {
        return (
            <View style={styles.darkColumn} {...layoutProps}>
                <Text style={styles.columnTitle}>{item.name}</Text>
                {columnComponent}
            </View>
        );
    }

    renderCard({ item }) {

        return (
            <View
                style={[this.state.darkMode ? styles.darkCard : styles.lightCardContainer, styles.elevation]}
            >
                <TouchableOpacity
                    onPress={() => {
                        // set the current task completed to true in the state variable
                        var data = this.state.data[0];
                        for (let i = 0; i < data.rows.length; i++) {
                            if (data.rows[i].id === item.id) {
                                data.rows[i].completed = !data.rows[i].completed;
                            }
                        }
                        // boardRepository.updateData([data]);
                        this.setState({ data: [data] });
                        // this.update(data);
                    }}
                >
                    {item.completed ? (
                        <AntDesign name="checkcircleo" size={size.scale(28)} color={color.primary} />
                    ) : (
                        <Entypo name="circle" size={size.scale(28)} color={color.primary} />
                    )}

                </TouchableOpacity>
                <Text
                    style={this.state.darkMode ? (!item.completed ? styles.darkCardTitle : styles.darkCardTitleCompleted) : styles.lightCardTitle}
                >
                    {item.title}
                </Text>
            </View>
        )

        return (
            <View style={[styles.darkCard, styles.elevation]}>
                <Text style={styles.darkCardTitle}>{item.title}</Text>
            </View>
        );
    };

    onDragEnd() {

        const { rows } = this.state.repository.getItemsChanged();

        var data = this.state.data;
        var dataRows = data[0].rows;

        for (let i = 0; i < rows.length; i++) {
            let cur_row = rows[i];
            for (let j = 0; j < dataRows.length; j++) {
                let cur_data = dataRows[j];
                if (cur_data.id == cur_row.id) {
                    console.log(cur_data, cur_row, cur_row.index);
                    dataRows[j].index = cur_row.index;
                }
            }
        }

        // sort data with index
        dataRows.sort(function (a, b) {
            return a.index - b.index;
        });

        this.setState({
            data: data
        })

    };

    render() {



        return (
            <View style={this.state.darkMode ? styles.darkHomeContainer : styles.lightHomeContainer}>

                {this.state.loading && (
                    <ActivityIndicator size="large" color={color.primary} />
                )}

                {
                    !this.state.loading && (
                        <Board
                            repository={this.state.repository}
                            renderRow={this.renderCard.bind(this)}
                            renderColumnWrapper={this.renderColumnWrapper}
                            // onRowPress={onCardPress}
                            onDragEnd={this.onDragEnd.bind(this)}
                        />
                    )
                }

                {/* {!this.state.loading && (
                    <Board
                        boardRepository={this.state.boardRepository}
                        open={() => { }}
                        onDragEnd={(srcClmId, dstClmId, item) => {

                            this.setState({ loading: true })

                            console.log(item.attributes.id, item.attributes.index);

                            var src = item.attributes.id;
                            var dst = item.attributes.index + 1;

                            // replace src with dst in the state var
                            let data = this.state.data[0];

                            var srcItem = undefined;
                            var dstItem = undefined;

                            var srcIndex = 0;
                            var dstIndex = 0;

                            for (let i = 0; i < data.rows.length; i++) {
                                if (data.rows[i].id == src) {
                                    srcItem = data.rows[i];
                                    srcIndex = i;
                                }
                                if (data.rows[i].id == dst) {
                                    dstItem = data.rows[i];
                                    dstIndex = i;
                                }
                            }

                            // console.log(srcItem, dstItem);
                            console.log("data", data, src, dst)

                            for (let i = 0; i < data.rows.length; i++) {
                                if (i == srcIndex) {
                                    data.rows[i] = dstItem;
                                }
                                if (i == dstIndex) {
                                    data.rows[i] = srcItem;
                                }
                            }

                            console.log("data", data)

                            this.setState({ data: [data] });

                            // this.state.boardRepository.updateData([data]);
                            const boardRepository = new BoardRepository([data]);
                            this.setState({ boardRepository, loading: false });

                        }}
                        boardBackground={color.background}
                        cardContent={(item) => {
                            return (
                                <View
                                    style={[this.state.darkMode ? styles.darkCardContainer : styles.lightCardContainer, styles.elevation]}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            // set the current task completed to true in the state variable
                                            var data = this.state.data[0];
                                            for (let i = 0; i < data.rows.length; i++) {
                                                if (data.rows[i].id === item.id) {
                                                    data.rows[i].completed = !data.rows[i].completed;
                                                }
                                            }
                                            // boardRepository.updateData([data]);
                                            // this.setState({ data: [data] });
                                            this.update(data);
                                        }}
                                    >
                                        {item.completed ? (
                                            <AntDesign name="checkcircleo" size={size.scale(28)} color={color.primary} />
                                        ) : (
                                            <Entypo name="circle" size={size.scale(28)} color={color.primary} />
                                        )}

                                    </TouchableOpacity>
                                    <Text style={this.state.darkMode ? (!item.completed ? styles.darkCardTitle : styles.darkCardTitleCompleted) : styles.lightCardTitle}>{item.name}</Text>
                                </View>
                            )
                        }}
                        isWithCountBadge={false}
                        columnBackgroundColor={color.background}
                        columnNameTextColor={color.primary}
                        columnNameFontSize={size.scale(32)}
                        columnNameFontFamily={typography.primaryBold}
                    />
                )} */}



            </View>
        );
    }
}

export default GoalDetailScreen;
