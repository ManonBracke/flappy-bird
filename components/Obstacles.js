import React from 'react';
import {  View } from 'react-native';

//export default function App() {

const Obstacles = ({color,obstaclesLeft, obstaclesWidth,obstaclesHeight, gap, randomBottom}) => {
    /*
    const obstaclesWidth = 60
    const obstaclesHeight =300
    const gap = 50
    */
    return (
        <>
            <View style={{
                position:'absolute',
                backgroundColor:color,
                width:obstaclesWidth,
                height:obstaclesHeight,
                left:obstaclesLeft,
                bottom:randomBottom + obstaclesHeight + gap,
            }} />
            <View style={{
                position:'absolute',
                backgroundColor:color,
                width:obstaclesWidth,
                height:obstaclesHeight,
                left:obstaclesLeft,
                bottom:randomBottom,
            }}></View>
            
        </>
    )
}
export default Obstacles