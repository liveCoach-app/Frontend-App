import React, { useState, useEffect, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



import makeFetchRequest from '../../HelperFunctions/MakeFetchRequest.js'

export default class StatScreen extends Component {

  state = {
    matchList: [],
    encryptedId: 0,
  }


   getEncryptedSummonerId = async (summonerName) => {
    const endpoint = "lol/summoner/v4/summoners/by-name/" + summonerName
    const request = await makeFetchRequest(endpoint, "GET", '')
    const id = request.data.accountId;
    return id;
  }

   getMatchHistory = async (eId) => {
    const matchIdEndpoint = "lol/match/v4/matchlists/by-account/" + eId;
    const matchListRequest = await makeFetchRequest(matchIdEndpoint, "GET", '');
    const matches = matchListRequest.data.matches;
    const gameIdList = matches.map((match) => {
      return match.gameId
    })
    let gameDetailList = [];
    for(var i = 0; i < 30; i++) {
      let gameDetailEndpoint = "lol/match/v4/matches/" + gameIdList[i];
      let gameDetailRequest = await makeFetchRequest(gameDetailEndpoint, "GET", '')

      gameDetailList.push(gameDetailRequest)
    }

    return gameDetailList;
  }

  getMostPlayedChamp = async (matchHistory, summonerName) => {

    var talliedList = [];

    for(var i = 0; i < matchHistory.length; i++) {
      const match = matchHistory[i];


      // get the player's identity for that match
      const identityList = match.data.participantIdentities;
      var playerIdentity = null
      identityList.forEach(participant => {
        if(participant.player.summonerName == summonerName) {
          playerIdentity = participant.participantId
        }
      });

      // get the champion id for the player's champion
      const summonerList = match.data.participants;
      const currentChampId = summonerList[playerIdentity - 1].championId;
      this.tallyChampion(talliedList, currentChampId)
    }
    console.log(talliedList)
    const mostPlayedChapionList = this.findMostPlayed(talliedList);

    const champList = await this.getChampName(mostPlayedChapionList)

  }


  //     const championList = await fetch(
  //       'http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json', {
  //         method: "GET",
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //        mode: "no-cors",
  //       }
  //    )

  getChampName = async (idList) => {


      const championList = await fetch('http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json')

      const jsonList = await championList.json();

      // for(var i = 0; i < idList.length; i++) {
      //   for(var x = 0; x < jsonList.length; i++) {
      //     if(idList[i].key === jsonList[i])
      //   }
      // }
      var tempChampList = idList;
      const jsonListData = jsonList.data

      for(var i = 0; i < idList.length; i++) {
        for (var value in jsonListData) {
          if( tempChampList[i].key == jsonListData[value].key) {
            const champPlayRate = `${idList[i].timesPlayed / .3}%`;
            const newChamp = {
              timesPlayed: idList[i].timesPlayed,
              key: idList[i].key,
              name: jsonListData[value].name,
              playRate: champPlayRate,

            }
            tempChampList[i] = newChamp;

          }
        }
      }
      console.log(tempChampList)

  }

  tallyChampion = (championList, champId) => {
    var tempChampList = championList;
    for(var i = 0; i < tempChampList.length; i++) {
      if(tempChampList[i].key === champId) {
        tempChampList[i].timesPlayed = tempChampList[i].timesPlayed + 1
        return tempChampList
      }
    }
    tempChampList.push({
      key: champId,
      timesPlayed: 1,
    });
    return tempChampList;
  }

  findMostPlayed = (championList) => {
    var first = {
      key: null,
      timesPlayed: 0,
    }
    var second = {
      key: null,
      timesPlayed: 0,
    }
    var third = {
      key: null,
      timesPlayed: 0,
    }

    championList.forEach(champion => {
      if(champion.timesPlayed > first.timesPlayed) {
        third = second;
        second = first;
        first = champion;
      }else if(champion.timesPlayed > second.timesPlayed) {
        third = second
        second = champion;
      }else if(champion.timesPlayed > third.timesPlayed) {
        third = champion;
      }
    });

    return [first, second, third]
  }



  setUp = async (summonerName) => {
    const eId = await this.getEncryptedSummonerId(summonerName)
    console.log(eId)
    const matchHistoryList = await this.getMatchHistory(eId)
    console.log(matchHistoryList[0].data)
    const tester = await this.getMostPlayedChamp(matchHistoryList, summonerName);

    this.setState({
      matchList: matchHistoryList,
      encryptedId: eId,
    })

  }

  componentDidMount(evt) {
    this.setUp('dekempsy4')
    console.log('HERE BRO')
  }

  render() {
    return (
      <div> hello </div>
    )
  }

}
