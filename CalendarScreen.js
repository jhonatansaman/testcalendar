import React from 'react';
import {
    StyleSheet, Text, View, Platform, TextInput, Image,
    ScrollView, ActivityIndicator,
    TouchableOpacity, FlatList
} from 'react-native';
import { CalendarList, Calendar, Agenda } from 'react-native-calendars';
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

export default class FindExercise extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            items: {},
            data: ['2019-04-30', '2019-04-20'],
            array: [],
        }
    }

    // async componentDidMount(){

    //     const array = {data: '2019/04/05', tarefa: 'prova português'};
    //     await this.setState({datinha: array})
        
        
    // }
    render() {
        return (
            <Agenda
              items={this.state.items}
              loadItemsForMonth={this.loadItems.bind(this)}
              selected={yyyy+'/'+mm+'/'+dd}
              renderItem={this.renderItem.bind(this)}
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}

            />
          );
        }
      
        loadItems(day) {
          setTimeout(() => {
            for(i = 0; i < this.state.data.length; i++){
            const strTime = this.timeToString(this.state.data[i]);
            if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
                  this.state.items[strTime].push({
                    name: 'Item for ' + strTime,
                    height: Math.max(50, Math.floor(Math.random() * 150))
                  });
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
              items: newItems
                 });
          }, 1000);
          
          // console.log(`Load Items for ${day.year}-${day.month}`);
        }
      
        renderItem(item) {
          return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
          );
        }
      
        renderEmptyDate() {
          return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
          );
        }
      
        rowHasChanged(r1, r2) {
          console.log("r1", r1);
          console.log("r2", r2);
          return r1.name !== r2.name;
        }
      
        timeToString(time) {
          const date = new Date(time);
          return date.toISOString().split('T')[0];
        }
      }
      
      const styles = StyleSheet.create({
        item: {
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 5,
          padding: 10,
          marginRight: 10,
          marginTop: 17
        },
        emptyDate: {
          height: 15,
          flex:1,
          paddingTop: 30
        }
      });
      