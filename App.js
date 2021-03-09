import React, {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableWithoutFeedbackBase } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth = Dimensions.get("screen").width   
  const screenHeight = Dimensions.get("screen").height  
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState( screenHeight / 2 )
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLefttwo, setObstaclesLefttwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegheight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegheighttwo, setObstaclesNegHeighttwo] = useState(0)
  const [score, setScore] = useState(0)
  const obstaclesWidth = 100
  const obstaclesHeight = 300
  const gap = 190  
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdtwo
  const [isGameOver, setIsGameOver] = useState(false)
  //start bird fallling 
  
  useEffect(()=> {
    if (birdBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])
console.log(birdBottom)
  
  //console.log(birdLeft)
 const jump =() => {
   if (!isGameOver && (birdBottom < screenHeight)){
     setBirdBottom(birdBottom => birdBottom + 50)
     console.log('jumped')
   }
 } 
 // start obstacle 
  useEffect(() => {
    if (obstaclesLeft > - obstaclesWidth) {
      obstaclesLeftTimerId =  setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      },30) 
      return () => {
      clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
      setScore(score => score + 1)
    }  
  },[obstaclesLeft])
//second obstacle
  useEffect(() => {
    if (obstaclesLefttwo > - obstaclesWidth) {
      obstaclesLeftTimerIdtwo =  setInterval(() => {
        setObstaclesLefttwo(obstaclesLefttwo => obstaclesLefttwo - 5)
      },30) 
      return () => {
      clearInterval(obstaclesLeftTimerIdtwo)
      }
    } else {
      setObstaclesLefttwo(screenWidth)
      setObstaclesNegHeighttwo( - Math.random() * 100)
      setScore(score => score + 1)
    }  
  },[obstaclesLefttwo])

//check colision
  useEffect(() => {
    if(
    ((birdBottom < (obstaclesNegheight + obstaclesHeight + 30) ||
    birdBottom > (obstaclesNegheight + obstaclesHeight + gap - 30)) &&
    (obstaclesLeft > screenWidth / 2 -30 && obstaclesLeft < screenWidth / 2 +0.1)
    ) 
    || 
    ((birdBottom < (obstaclesNegheighttwo + obstaclesHeight + 30) ||
    birdBottom > (obstaclesNegheighttwo + obstaclesHeight + gap - 30)) &&
    (obstaclesLefttwo > screenWidth / 2 -30 && obstaclesLefttwo < screenWidth / 2 + 0.1)
    ) 
    )
    {
      console.log('Game over!')
      gameOver()
     
    }
  })

  const gameOver= () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdtwo)
    setIsGameOver(true)
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      {isGameOver && <Text>{score}</Text>}
    <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
     />
    
      <Obstacles 
        color={'lightgreen'}
        obstaclesWidth = {obstaclesWidth}
        obstaclesHeight = {obstaclesHeight}
        randomBottom={obstaclesNegheight}        
        gap={gap}
        obstaclesLeft = {obstaclesLeft}
      />
      <Obstacles 
        color={'yellow'}
        obstaclesWidth = {obstaclesWidth}
        obstaclesHeight = {obstaclesHeight}
        randomBottom = {obstaclesNegheighttwo}
        gap={gap}
        obstaclesLeft = {obstaclesLefttwo}
      />  
    </View>
    </TouchableWithoutFeedback>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
