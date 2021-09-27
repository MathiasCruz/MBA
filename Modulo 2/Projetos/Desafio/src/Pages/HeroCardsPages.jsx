import Select from '../Components/Select';
import Header from '../Components/Header';
import Main from '../Components/Main';
import ActualCity from '../Components/ActualCity';
import { useEffect, useState } from 'react';
import {
  apiGetAllCities,
  apiGetAllCandidates,
  apiGetInfoByCity,
} from '../Service/apiService';
import HeroCard from '../Components/HeroCard';
import HeroCards from '../Components/HeroCards';
export default function HeroCardsPages() {
  const [AllCities, setAllCities] = useState([]);
  const [AllCandidates, setAllCandidates] = useState([]);
  const [CurrentCity, setCurrentCity] = useState([0]);
  const [electionInfo, setElectionInfo] = useState([]);
  const [candidatesbyCity, setCandidatesbyCity] = useState([]);
  useEffect(() => {
    apiGetAllCities().then(returnCities => {
      setAllCities(returnCities);
    });
  }, []);
  useEffect(() => {
    apiGetAllCandidates().then(returnedCandidates => {
      setAllCandidates(returnedCandidates);
    });
  }, []);
  useEffect(() => {
    apiGetInfoByCity(CurrentCity[0].id).then(candidatesInfo => {
      setElectionInfo(candidatesInfo);
    });
  }, [CurrentCity]);

  function HandleOptionChange(cityId) {
    let currentCity = AllCities.filter(city => {
      if (city.id === cityId) return { ...city };
    });

    setCurrentCity(currentCity);
  }

  useEffect(() => {
    // let filterCandidates = [];
    // for (let i = 0; i < AllCandidates.length; i++) {
    //   for (let j = 0; j < electionInfo.length; j++) {
    //     if (AllCandidates[i].id === electionInfo[j].candidateId) {
    //       let candidateVote = {
    //         ...AllCandidates[i],
    //         votes: electionInfo[j].votes,
    //         percentage: (electionInfo[j].votes / CurrentCity[0].presence) * 100,
    //       };
    //       filterCandidates.push(candidateVote);
    //     }
    //   }
    // }

    const newFilter = electionInfo.map(elect => {
      const newtest = AllCandidates.find(
        candidate => elect.candidateId === candidate.id
      );
      return {
        ...newtest,
        votes: elect.votes,
        percentage: (elect.votes / CurrentCity[0].presence) * 100,
      };
    });

    setCandidatesbyCity(newFilter.sort(ArrangeByPercentage));
  }, [electionInfo]);
  function ArrangeByPercentage(a, b) {
    if (a.percentage > b.percentage) {
      return -1;
    }
    if (a.percentage < b.percentage) {
      return 1;
    }
    return 0;
  }
  return (
    <>
      <Header>Teste</Header>
      <div className="text-center border">
        <Select changeEvent={HandleOptionChange}>{AllCities}</Select>
      </div>
      <ActualCity>{CurrentCity[0]}</ActualCity>
      <Main>
        <HeroCards>
          {candidatesbyCity.map(candidate => {
            return <HeroCard key={candidate.id}>{candidate}</HeroCard>;
          })}
        </HeroCards>
      </Main>
    </>
  );
}
