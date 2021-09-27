let options = {
  method:'GET'
}
let calendar = document.getElementById('diaAtual');
calendar.addEventListener('change',GetInfoByDateAndCountry);
let dateFrom;
let dateTo;
SearchAndLoadGlobal();
SearchAndLoadCountry();

function GetInfoByDateAndCountry(e)
{
  const country = SearchCountry();
  if(country != 'Global'){
    const dateSearch = e.target.value;
    RequestByDateAndCountry(dateSearch,country);
  }
 

}
function SearchCountry(){
  const country = document.getElementById('combo').value;
  return country;
}

function RequestByDateAndCountry(dateSearch, country){
  let url = new URL(`https://api.covid19api.com/live/country/${country}`);
  dateFrom = TirarDia(dateSearch);
  dateTo = dateSearch;
  let params = {
    from: dateFrom,
    to: dateTo
  }
  url.search = new URLSearchParams(params);
  let request = fetch(`https://api.covid19api.com/live/country/${country}${url.search}`,options);
  request.then((response)=>{
    if(response.ok){
      response.json().then((convertDataHoje)=>{
        params.from = TirarDia(params.from);
        params.to = TirarDia(params.to);
        let url2 = url;
        url2.search = new URLSearchParams(params);
        let requestDateyesterday =  fetch(`https://api.covid19api.com/live/country/${country}${url2.search}`,options);
        requestDateyesterday.then((req)=>{
          if(req.ok){
            req.json().then((convertDataYesterday)=>{
              TratarRetornosEAtualizarTela(convertDataYesterday,convertDataHoje);
            }
          )};
        });
       ;
       // InputCovidInfoByCountry(convertData);
      })}
  })
}

function InputCovidInfo(confirmed,deaths,recovered,active){
  
  InsertCovidData('confirmados',confirmed);
  InsertCovidData('mortos',deaths);
  InsertCovidData('recuperados',recovered);
  InsertCovidData('ativos',active);
} 

function SearchAndLoadGlobal(){
  let covidInfoGlobal = fetch("https://api.covid19api.com/summary",options); 
  covidInfoGlobal.then((response)=>
  {
    response.json().then((Data)=>
    {
      InputCovidInfo(Data.Global.TotalConfirmed, Data.Global.TotalDeaths,Data.Global.TotalRecovered,Data.Global.NewConfirmed);
    }
    )
  }).catch(console.error);;
}

function SearchAndLoadCountry(){
  let country = fetch("https://api.covid19api.com/countries",options);
country.then((response)=>
{
  response.json().then((convertData)=>
  {
    let combo = document.getElementById('combo');
    let newData = CreateSelect(convertData);
    combo.insertAdjacentHTML('beforeend',newData);
  })
}).catch(console.error);
}


function CreateSelect(convertData)
{
  let newselects = convertData.map(convertData =>{
    return `<option>${convertData.Country}</option>`
  });
  return newselects;
}

function InsertCovidData(property,json)
{
  const elementP = document.getElementById(property);
  elementP.innerText = json;
}

function TirarDia(data){
  let novaData = new Date(data).toLocaleDateString('en-CA');
  return novaData
}

function TratarRetornosEAtualizarTela(jsonYesterday,jsonToday){
  jsonYesterday = ReturnArraySum(jsonYesterday);
  jsonToday =  ReturnArraySum(jsonToday);
  InputCovidInfo(jsonToday.totalConfirmed,jsonToday.totalDeath,jsonToday.totalRecovered,jsonToday.totalActive);
  let covidDiary = DiaryCases(jsonToday,jsonYesterday);
  UpdateInfoDiary(covidDiary);
  //IncludeImgUp();
 }


 function IncludeImgUp(idProperty){
   let img = document.getElementById(idProperty).src = "/assets/img/up.png";
 }
 function IncludeImgDown(idProperty){
  let img = document.getElementById(idProperty).src = "/assets/img/down.png";
}

function DiaryCases(today,yesterday){
  let covidDiary = new CovidInfo();
  covidDiary.totalConfirmed = today.totalConfirmed - yesterday.totalConfirmed;
  covidDiary.todayMoreConfirmed  = today.totalConfirmed > yesterday.totalConfirmed ? true : false;
  covidDiary.totalDeath = today.totalDeath - yesterday.totalDeath;
  covidDiary.todayMoreDeath  = today.totalDeath > yesterday.totalDeath   ? true : false;
  covidDiary.totalRecovered = today.totalRecovered - yesterday.totalRecovered;
  covidDiary.todayMoreRecovered  = today.totalRecovered > yesterday.totalRecovered  ? true : false;
  covidDiary.totalActive = today.totalActive - yesterday.totalActive;
  covidDiary.todayMoreActive  = today.totalActive > yesterday.totalActive  ?   true : false;
  return covidDiary;
}

function UpdateInfoDiary(covidDiary){
  InsertCovidData('confirmadoDiario',"Diario " + covidDiary.totalConfirmed);
  InsertCovidData('mortesDiario',"Diario " + covidDiary.totalDeath);
  InsertCovidData('recuperadosDiario',"Diario " +covidDiary.totalRecovered);
  InsertCovidData('ativosDiario',"Diario " + covidDiary.totalActive);
  InsertImg(covidDiary);
  
}

function InsertImg(covidDiary){

  if (covidDiary.todayMoreConfirmed ? IncludeImgUp("imgConfirmados") : IncludeImgDown("imgConfirmados"));
  if (covidDiary.todayMoreDeath ? IncludeImgUp("imgMortes") : IncludeImgDown("imgMortes"));
  if (covidDiary.todayMoreRecovered ? IncludeImgUp("imgRecuperados") : IncludeImgDown("imgRecuperados"));
  if (covidDiary.todayMoreActive ? IncludeImgUp("imgAtivos") : IncludeImgDown("imgAtivos"));

}

 function ReturnArraySum(obj){
  let CovidInfo = {
    totalConfirmed :0,
    totalDeath : 0,
    totalRecovered:0,
    totalActive:0
  };
  for(let i = 0; i< obj.length;i++){
    CovidInfo.totalConfirmed += obj[i].Confirmed;
    CovidInfo.totalDeath += obj[i].Deaths;
    CovidInfo.TotalRecovered += obj[i].Recovered;
    CovidInfo.totalActive += obj[i].Active;
    
  }
  return CovidInfo;
 }

 function  CovidInfo()  {
  this.totalConfirmed,
  this.totalDeath ,
  this.totalRecovered,
  this.totalActive,
  this.todayMoreConfirmed,
  this.todayMoreDeath,
  this.todayMoreRecovered,
  this.todayMoreActive 
}